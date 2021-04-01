package org.regitiny.minhshop.service.business;

import io.vavr.Tuple;
import io.vavr.Tuple2;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.regitiny.minhshop.service.FileService;
import org.regitiny.tools.magic.exception.NhechException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.security.util.InMemoryResource;
import org.springframework.stereotype.Service;
import org.zalando.problem.Status;

import java.io.IOException;

import static java.lang.Math.min;

@Service
@Log4j2
public class VideoStreamingBusiness
{
  private final FileService fileService;

  public VideoStreamingBusiness(FileService fileService)
  {
    this.fileService = fileService;
  }

  public Tuple2<Resource, String> getVideoByVideoName_Cache(String videoName)
  {
    return fileService.getFileByFileName(videoName)
      .map(file -> Tuple.of(
        (Resource) new InMemoryResource(new byte[1]),
        file.getTypeFile()
      ))
      .orElseThrow(() ->
      {
        throw new NhechException(null, "File not found", Status.OK, "làm méo gì có cái file này");
      });
  }

  public Tuple2<ResourceRegion, String> getResourceRegion(String videoName, String range)
  {
    return getVideoByVideoName_Cache(videoName)
      .map((video, fileType) ->
      {
        ResourceRegion resourceRegion;
        long contentLength = 0;
        try
        {
          contentLength = video.contentLength();
        }
        catch (IOException e)
        {
          log.info("error video.contentLength or video no data: {} ", e.getMessage());
        }
        long fromRange = 0;
        long toRange = 0;
        if (StringUtils.isNotBlank(range))
        {
          String[] ranges = range
            .substring("bytes=".length())
            .split("-");
          fromRange = Integer.parseInt(ranges[0]);
          if (ranges.length > 1)
            toRange = Integer.parseInt(ranges[1]);
          else
            toRange = (int) (contentLength - 1);
        }
        if (fromRange > 0)
        {
          long rangeLength = min(2000000, toRange - fromRange + 1);
          resourceRegion = new ResourceRegion(video, fromRange, rangeLength);
        }
        else
        {
          long rangeLength = min(4000000, contentLength - 1);
          resourceRegion = new ResourceRegion(video, 0, rangeLength);
        }
        return Tuple.of(resourceRegion, fileType);
      });
  }
}
