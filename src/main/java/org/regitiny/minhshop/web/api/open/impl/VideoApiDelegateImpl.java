package org.regitiny.minhshop.web.api.open.impl;

import lombok.extern.slf4j.Slf4j;
import org.regitiny.minhshop.security.AuthoritiesConstants;
import org.regitiny.minhshop.security.SecurityUtils;
import org.regitiny.minhshop.service.FileService;
import org.regitiny.minhshop.service.business.VideoProcessingBusiness;
import org.regitiny.minhshop.service.business.VideoStreamingBusiness;
import org.regitiny.minhshop.service.dto.FileDTO;
import org.regitiny.minhshop.web.api.open.VideoApiDelegate;
import org.regitiny.tools.magic.exception.NhechException;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.zalando.problem.Status;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
public class VideoApiDelegateImpl implements VideoApiDelegate
{
  private final FileService fileService;
  private final VideoStreamingBusiness videoStreamingBusiness;
  private final VideoProcessingBusiness videoProcessingBusiness;

  public VideoApiDelegateImpl(FileService fileService, VideoStreamingBusiness videoStreamingBusiness, VideoProcessingBusiness videoProcessingBusiness)
  {
    this.fileService = fileService;
    this.videoStreamingBusiness = videoStreamingBusiness;
    this.videoProcessingBusiness = videoProcessingBusiness;
  }

  @Override
  public ResponseEntity<Object> uploadVideos(@Valid List<MultipartFile> videoDatas)
  {
//    fileService.uploads(videoData);
//    return ResponseEntity.ok(new ResponseDefaultModel());
    log.debug("number of videos uploaded is = {}", videoDatas.size());
    log.debug("Request to upload File : dataIsEmpty = {}", videoDatas.isEmpty());
    SecurityUtils.checkAuthenticationAndAuthority(AuthoritiesConstants.MANAGEMENT);
    var result = new ArrayList<FileDTO>();
    Flux.fromIterable(videoDatas)
      .filter(videoData -> !videoData.isEmpty())
      .map(videoData ->
      {
        var fileDTO = fileService.upload(videoData);
        videoProcessingBusiness.saveVideoToFolder(fileDTO.getNameFile(), videoData);
        result.add(fileDTO);
        return fileDTO;
      })
      .flatMap(fileDTO -> Mono
        .just(fileDTO.getNameFile())
        .map(videoProcessingBusiness::ffmpegVideoQualityReductionNormal)
//        .flatMap() after processing video must update  processed
        .subscribeOn(Schedulers.elastic())).subscribe();
    return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, String.valueOf(MediaType.APPLICATION_JSON)).body(result);
  }

  @Override
  public ResponseEntity<byte[]> getVideoDataByName(String videoName)
  {
    return fileService.getFileByFileName(videoName)
      .map(file ->
      {
        byte[] fileData = null;
//        var fileData = file.getFileData();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.CONTENT_TYPE, file.getTypeFile());
        return ResponseEntity.ok().headers(httpHeaders).body(fileData);
      })
      .orElseThrow(() ->
      {
        throw new NhechException(null, "File not found", Status.OK, "làm méo gì có cái file này");
      });
  }

  @Override
  public ResponseEntity<ResourceRegion> getVideoStreamDataByName(String videoName, String range)
  {
//    log.debug("videoName = {} , ranger = {}",videoName,range);
//    var dataRegion_TypeFile = videoStreamingBusiness.getResourceRegion(videoName,range);
//    return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT).header(dataRegion_TypeFile._2()).body(dataRegion_TypeFile._1());

    log.debug("videoName = {} , ranger = {}", videoName, range);
    return videoStreamingBusiness.getResourceRegion(videoName, range)
      .apply((resourceRegion, fileType) ->
        ResponseEntity.status(HttpStatus.PARTIAL_CONTENT).header(fileType).body(resourceRegion)
      );

  }


}


