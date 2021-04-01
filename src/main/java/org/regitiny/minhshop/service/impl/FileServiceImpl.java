package org.regitiny.minhshop.service.impl;

import lombok.extern.log4j.Log4j2;
import org.regitiny.minhshop.config.constant.ServerCommand;
import org.regitiny.minhshop.domain.File;
import org.regitiny.minhshop.repository.FileRepository;
import org.regitiny.minhshop.repository.search.FileSearchRepository;
import org.regitiny.minhshop.security.AuthoritiesConstants;
import org.regitiny.minhshop.security.SecurityUtils;
import org.regitiny.minhshop.service.FileService;
import org.regitiny.minhshop.service.dto.FileDTO;
import org.regitiny.minhshop.service.mapper.FileMapper;
import org.regitiny.tools.magic.constant.StringPool;
import org.regitiny.tools.magic.utils.EntityDefaultPropertiesServiceUtils;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * Service Implementation for managing {@link File}.
 */
@Service
@Transactional
@Log4j2
public class FileServiceImpl implements FileService
{

  private final FileRepository fileRepository;
  private final FileMapper fileMapper;
  private final FileSearchRepository fileSearchRepository;

  public FileServiceImpl(FileRepository fileRepository, FileMapper fileMapper, FileSearchRepository fileSearchRepository)
  {
    this.fileRepository = fileRepository;
    this.fileMapper = fileMapper;
    this.fileSearchRepository = fileSearchRepository;
  }

  @Override
  public FileDTO save(FileDTO fileDTO)
  {
    log.debug("Request to save File : {}", fileDTO);
    File file = fileMapper.toEntity(fileDTO);
    file = fileRepository.save(file);
    FileDTO result = fileMapper.toDto(file);
    fileSearchRepository.save(file);
    return result;
  }

  @Override
  public FileDTO upload(MultipartFile fileData)
  {
    log.debug("Request to upload File : dataIsEmpty = {}", fileData.isEmpty());
    SecurityUtils.checkAuthenticationAndAuthority(AuthoritiesConstants.MANAGEMENT);

    File file = (File) EntityDefaultPropertiesServiceUtils.setPropertiesBeforeSave(new File());
    String nameFile = file.getUuid().toString();
    String extension = StringPool.BLANK;
    String typeFile = fileData.getContentType();
    long dataSize = fileData.getSize();
    String comment = null;

    String fileDataName = fileData.getOriginalFilename();
    String[] temp = fileDataName != null ? fileDataName.split(StringPool.DOT_IN_REGEX) : new String[0];
    if (temp.length >= 2) extension = temp[temp.length - 1];
    nameFile += StringPool.PERIOD + extension;

    file.nameFile(nameFile)
      .pathFileOriginal(ServerCommand.getFOLDER_INPUT())
      .pathFileProcessed(ServerCommand.getFOLDER_OUTPUT())
      .processed(false)
      .dataSize(dataSize)
      .typeFile(typeFile)
      .extension(extension)
      .comment(comment);
    return fileMapper.toDto(fileRepository.save(file));

  }


  @Override
  @Cacheable(key = "{#fileName}", cacheNames = FileService.FILE_BY_FILE_NAME_CACHE)
  public Optional<File> getFileByFileName(String fileName)
  {
    log.debug("file name = {}", fileName);
    return fileRepository.findByNameFile(fileName);
  }

  @Override
  public Optional<FileDTO> partialUpdate(FileDTO fileDTO)
  {
    log.debug("Request to partially update File : {}", fileDTO);

    return fileRepository
      .findById(fileDTO.getId())
      .map(
        existingFile ->
        {
          fileMapper.partialUpdate(existingFile, fileDTO);
          return existingFile;
        }
      )
      .map(fileRepository::save)
      .map(
        savedFile ->
        {
          fileSearchRepository.save(savedFile);

          return savedFile;
        }
      )
      .map(fileMapper::toDto);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<FileDTO> findAll(Pageable pageable)
  {
    log.debug("Request to get all Files");
    return fileRepository.findAll(pageable).map(fileMapper::toDto);
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<FileDTO> findOne(Long id)
  {
    log.debug("Request to get File : {}", id);
    return fileRepository.findById(id).map(fileMapper::toDto);
  }

  @Override
  public void delete(Long id)
  {
    log.debug("Request to delete File : {}", id);
    fileRepository.deleteById(id);
    fileSearchRepository.deleteById(id);
  }

  @Override
  @Transactional(readOnly = true)
  public Page<FileDTO> search(String query, Pageable pageable)
  {
    log.debug("Request to search for a page of Files for query {}", query);
    return fileSearchRepository.search(queryStringQuery(query), pageable).map(fileMapper::toDto);
  }
}
