package org.regitiny.minhshop.web.rest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.regitiny.minhshop.IntegrationTest;
import org.regitiny.minhshop.domain.File;
import org.regitiny.minhshop.repository.FileRepository;
import org.regitiny.minhshop.repository.search.FileSearchRepository;
import org.regitiny.minhshop.service.dto.FileDTO;
import org.regitiny.minhshop.service.mapper.FileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FileResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class FileResourceIT
{

  private static final UUID DEFAULT_UUID = UUID.randomUUID();
  private static final UUID UPDATED_UUID = UUID.randomUUID();

  private static final String DEFAULT_PATH_FILE_ORIGINAL = "AAAAAAAAAA";
  private static final String UPDATED_PATH_FILE_ORIGINAL = "BBBBBBBBBB";

  private static final String DEFAULT_PATH_FILE_PROCESSED = "AAAAAAAAAA";
  private static final String UPDATED_PATH_FILE_PROCESSED = "BBBBBBBBBB";

  private static final String DEFAULT_NAME_FILE = "AAAAAAAAAA";
  private static final String UPDATED_NAME_FILE = "BBBBBBBBBB";

  private static final String DEFAULT_EXTENSION = "AAAAAAAAAA";
  private static final String UPDATED_EXTENSION = "BBBBBBBBBB";

  private static final String DEFAULT_TYPE_FILE = "AAAAAAAAAA";
  private static final String UPDATED_TYPE_FILE = "BBBBBBBBBB";

  private static final Boolean DEFAULT_PROCESSED = false;
  private static final Boolean UPDATED_PROCESSED = true;

  private static final String DEFAULT_SEARCH_FIELD = "AAAAAAAAAA";
  private static final String UPDATED_SEARCH_FIELD = "BBBBBBBBBB";

  private static final String DEFAULT_ROLE = "AAAAAAAAAA";
  private static final String UPDATED_ROLE = "BBBBBBBBBB";

  private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
  private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

  private static final Instant DEFAULT_MODIFIED_DATE = Instant.ofEpochMilli(0L);
  private static final Instant UPDATED_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

  private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
  private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

  private static final String DEFAULT_MODIFIED_BY = "AAAAAAAAAA";
  private static final String UPDATED_MODIFIED_BY = "BBBBBBBBBB";

  private static final Long DEFAULT_DATA_SIZE = 1L;
  private static final Long UPDATED_DATA_SIZE = 2L;

  private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
  private static final String UPDATED_COMMENT = "BBBBBBBBBB";

  private static final String ENTITY_API_URL = "/api/files";
  private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";
  private static final String ENTITY_SEARCH_API_URL = "/api/_search/files";

  private static final Random random = new Random();
  private static final AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

  @Autowired
  private FileRepository fileRepository;

  @Autowired
  private FileMapper fileMapper;

  /**
   * This repository is mocked in the org.regitiny.minhshop.repository.search test package.
   *
   * @see org.regitiny.minhshop.repository.search.FileSearchRepositoryMockConfiguration
   */
  @Autowired
  private FileSearchRepository mockFileSearchRepository;

  @Autowired
  private EntityManager em;

  @Autowired
  private MockMvc restFileMockMvc;

  private File file;

  /**
   * Create an entity for this test.
   * <p>
   * This is a static method, as tests for other entities might also need it,
   * if they test an entity which requires the current entity.
   */
  public static File createEntity(EntityManager em)
  {
    File file = new File()
      .uuid(DEFAULT_UUID)
      .pathFileOriginal(DEFAULT_PATH_FILE_ORIGINAL)
      .pathFileProcessed(DEFAULT_PATH_FILE_PROCESSED)
      .nameFile(DEFAULT_NAME_FILE)
      .extension(DEFAULT_EXTENSION)
      .typeFile(DEFAULT_TYPE_FILE)
      .processed(DEFAULT_PROCESSED)
      .searchField(DEFAULT_SEARCH_FIELD)
      .role(DEFAULT_ROLE)
      .createdDate(DEFAULT_CREATED_DATE)
      .modifiedDate(DEFAULT_MODIFIED_DATE)
      .createdBy(DEFAULT_CREATED_BY)
      .modifiedBy(DEFAULT_MODIFIED_BY)
      .dataSize(DEFAULT_DATA_SIZE)
      .comment(DEFAULT_COMMENT);
    return file;
  }

  /**
   * Create an updated entity for this test.
   * <p>
   * This is a static method, as tests for other entities might also need it,
   * if they test an entity which requires the current entity.
   */
  public static File createUpdatedEntity(EntityManager em)
  {
    File file = new File()
      .uuid(UPDATED_UUID)
      .pathFileOriginal(UPDATED_PATH_FILE_ORIGINAL)
      .pathFileProcessed(UPDATED_PATH_FILE_PROCESSED)
      .nameFile(UPDATED_NAME_FILE)
      .extension(UPDATED_EXTENSION)
      .typeFile(UPDATED_TYPE_FILE)
      .processed(UPDATED_PROCESSED)
      .searchField(UPDATED_SEARCH_FIELD)
      .role(UPDATED_ROLE)
      .createdDate(UPDATED_CREATED_DATE)
      .modifiedDate(UPDATED_MODIFIED_DATE)
      .createdBy(UPDATED_CREATED_BY)
      .modifiedBy(UPDATED_MODIFIED_BY)
      .dataSize(UPDATED_DATA_SIZE)
      .comment(UPDATED_COMMENT);
    return file;
  }

  @BeforeEach
  public void initTest()
  {
    file = createEntity(em);
  }

  @Test
  @Transactional
  void createFile() throws Exception
  {
    int databaseSizeBeforeCreate = fileRepository.findAll().size();
    // Create the File
    FileDTO fileDTO = fileMapper.toDto(file);
    restFileMockMvc
      .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fileDTO)))
      .andExpect(status().isCreated());

    // Validate the File in the database
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeCreate + 1);
    File testFile = fileList.get(fileList.size() - 1);
    assertThat(testFile.getUuid()).isEqualTo(DEFAULT_UUID);
    assertThat(testFile.getPathFileOriginal()).isEqualTo(DEFAULT_PATH_FILE_ORIGINAL);
    assertThat(testFile.getPathFileProcessed()).isEqualTo(DEFAULT_PATH_FILE_PROCESSED);
    assertThat(testFile.getNameFile()).isEqualTo(DEFAULT_NAME_FILE);
    assertThat(testFile.getExtension()).isEqualTo(DEFAULT_EXTENSION);
    assertThat(testFile.getTypeFile()).isEqualTo(DEFAULT_TYPE_FILE);
    assertThat(testFile.getProcessed()).isEqualTo(DEFAULT_PROCESSED);
    assertThat(testFile.getSearchField()).isEqualTo(DEFAULT_SEARCH_FIELD);
    assertThat(testFile.getRole()).isEqualTo(DEFAULT_ROLE);
    assertThat(testFile.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    assertThat(testFile.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
    assertThat(testFile.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
    assertThat(testFile.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    assertThat(testFile.getDataSize()).isEqualTo(DEFAULT_DATA_SIZE);
    assertThat(testFile.getComment()).isEqualTo(DEFAULT_COMMENT);

    // Validate the File in Elasticsearch
    verify(mockFileSearchRepository, times(1)).save(testFile);
  }

  @Test
  @Transactional
  void createFileWithExistingId() throws Exception
  {
    // Create the File with an existing ID
    file.setId(1L);
    FileDTO fileDTO = fileMapper.toDto(file);

    int databaseSizeBeforeCreate = fileRepository.findAll().size();

    // An entity with an existing ID cannot be created, so this API call must fail
    restFileMockMvc
      .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fileDTO)))
      .andExpect(status().isBadRequest());

    // Validate the File in the database
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeCreate);

    // Validate the File in Elasticsearch
    verify(mockFileSearchRepository, times(0)).save(file);
  }

  @Test
  @Transactional
  void checkUuidIsRequired() throws Exception
  {
    int databaseSizeBeforeTest = fileRepository.findAll().size();
    // set the field null
    file.setUuid(null);

    // Create the File, which fails.
    FileDTO fileDTO = fileMapper.toDto(file);

    restFileMockMvc
      .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fileDTO)))
      .andExpect(status().isBadRequest());

    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeTest);
  }

  @Test
  @Transactional
  void checkProcessedIsRequired() throws Exception
  {
    int databaseSizeBeforeTest = fileRepository.findAll().size();
    // set the field null
    file.setProcessed(null);

    // Create the File, which fails.
    FileDTO fileDTO = fileMapper.toDto(file);

    restFileMockMvc
      .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fileDTO)))
      .andExpect(status().isBadRequest());

    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeTest);
  }

  @Test
  @Transactional
  void getAllFiles() throws Exception
  {
    // Initialize the database
    fileRepository.saveAndFlush(file);

    // Get all the fileList
    restFileMockMvc
      .perform(get(ENTITY_API_URL + "?sort=id,desc"))
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
      .andExpect(jsonPath("$.[*].id").value(hasItem(file.getId().intValue())))
      .andExpect(jsonPath("$.[*].uuid").value(hasItem(DEFAULT_UUID.toString())))
      .andExpect(jsonPath("$.[*].pathFileOriginal").value(hasItem(DEFAULT_PATH_FILE_ORIGINAL)))
      .andExpect(jsonPath("$.[*].pathFileProcessed").value(hasItem(DEFAULT_PATH_FILE_PROCESSED)))
      .andExpect(jsonPath("$.[*].nameFile").value(hasItem(DEFAULT_NAME_FILE)))
      .andExpect(jsonPath("$.[*].extension").value(hasItem(DEFAULT_EXTENSION)))
      .andExpect(jsonPath("$.[*].typeFile").value(hasItem(DEFAULT_TYPE_FILE)))
      .andExpect(jsonPath("$.[*].processed").value(hasItem(DEFAULT_PROCESSED.booleanValue())))
      .andExpect(jsonPath("$.[*].searchField").value(hasItem(DEFAULT_SEARCH_FIELD)))
      .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE)))
      .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
      .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(DEFAULT_MODIFIED_DATE.toString())))
      .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
      .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY)))
      .andExpect(jsonPath("$.[*].dataSize").value(hasItem(DEFAULT_DATA_SIZE.intValue())))
      .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)));
  }

  @Test
  @Transactional
  void getFile() throws Exception
  {
    // Initialize the database
    fileRepository.saveAndFlush(file);

    // Get the file
    restFileMockMvc
      .perform(get(ENTITY_API_URL_ID, file.getId()))
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
      .andExpect(jsonPath("$.id").value(file.getId().intValue()))
      .andExpect(jsonPath("$.uuid").value(DEFAULT_UUID.toString()))
      .andExpect(jsonPath("$.pathFileOriginal").value(DEFAULT_PATH_FILE_ORIGINAL))
      .andExpect(jsonPath("$.pathFileProcessed").value(DEFAULT_PATH_FILE_PROCESSED))
      .andExpect(jsonPath("$.nameFile").value(DEFAULT_NAME_FILE))
      .andExpect(jsonPath("$.extension").value(DEFAULT_EXTENSION))
      .andExpect(jsonPath("$.typeFile").value(DEFAULT_TYPE_FILE))
      .andExpect(jsonPath("$.processed").value(DEFAULT_PROCESSED.booleanValue()))
      .andExpect(jsonPath("$.searchField").value(DEFAULT_SEARCH_FIELD))
      .andExpect(jsonPath("$.role").value(DEFAULT_ROLE))
      .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
      .andExpect(jsonPath("$.modifiedDate").value(DEFAULT_MODIFIED_DATE.toString()))
      .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
      .andExpect(jsonPath("$.modifiedBy").value(DEFAULT_MODIFIED_BY))
      .andExpect(jsonPath("$.dataSize").value(DEFAULT_DATA_SIZE.intValue()))
      .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT));
  }

  @Test
  @Transactional
  void getNonExistingFile() throws Exception
  {
    // Get the file
    restFileMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
  }

  @Test
  @Transactional
  void putNewFile() throws Exception
  {
    // Initialize the database
    fileRepository.saveAndFlush(file);

    int databaseSizeBeforeUpdate = fileRepository.findAll().size();

    // Update the file
    File updatedFile = fileRepository.findById(file.getId()).get();
    // Disconnect from session so that the updates on updatedFile are not directly saved in db
    em.detach(updatedFile);
    updatedFile
      .uuid(UPDATED_UUID)
      .pathFileOriginal(UPDATED_PATH_FILE_ORIGINAL)
      .pathFileProcessed(UPDATED_PATH_FILE_PROCESSED)
      .nameFile(UPDATED_NAME_FILE)
      .extension(UPDATED_EXTENSION)
      .typeFile(UPDATED_TYPE_FILE)
      .processed(UPDATED_PROCESSED)
      .searchField(UPDATED_SEARCH_FIELD)
      .role(UPDATED_ROLE)
      .createdDate(UPDATED_CREATED_DATE)
      .modifiedDate(UPDATED_MODIFIED_DATE)
      .createdBy(UPDATED_CREATED_BY)
      .modifiedBy(UPDATED_MODIFIED_BY)
      .dataSize(UPDATED_DATA_SIZE)
      .comment(UPDATED_COMMENT);
    FileDTO fileDTO = fileMapper.toDto(updatedFile);

    restFileMockMvc
      .perform(
        put(ENTITY_API_URL_ID, fileDTO.getId())
          .contentType(MediaType.APPLICATION_JSON)
          .content(TestUtil.convertObjectToJsonBytes(fileDTO))
      )
      .andExpect(status().isOk());

    // Validate the File in the database
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeUpdate);
    File testFile = fileList.get(fileList.size() - 1);
    assertThat(testFile.getUuid()).isEqualTo(UPDATED_UUID);
    assertThat(testFile.getPathFileOriginal()).isEqualTo(UPDATED_PATH_FILE_ORIGINAL);
    assertThat(testFile.getPathFileProcessed()).isEqualTo(UPDATED_PATH_FILE_PROCESSED);
    assertThat(testFile.getNameFile()).isEqualTo(UPDATED_NAME_FILE);
    assertThat(testFile.getExtension()).isEqualTo(UPDATED_EXTENSION);
    assertThat(testFile.getTypeFile()).isEqualTo(UPDATED_TYPE_FILE);
    assertThat(testFile.getProcessed()).isEqualTo(UPDATED_PROCESSED);
    assertThat(testFile.getSearchField()).isEqualTo(UPDATED_SEARCH_FIELD);
    assertThat(testFile.getRole()).isEqualTo(UPDATED_ROLE);
    assertThat(testFile.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    assertThat(testFile.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
    assertThat(testFile.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
    assertThat(testFile.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    assertThat(testFile.getDataSize()).isEqualTo(UPDATED_DATA_SIZE);
    assertThat(testFile.getComment()).isEqualTo(UPDATED_COMMENT);

    // Validate the File in Elasticsearch
    verify(mockFileSearchRepository).save(testFile);
  }

  @Test
  @Transactional
  void putNonExistingFile() throws Exception
  {
    int databaseSizeBeforeUpdate = fileRepository.findAll().size();
    file.setId(count.incrementAndGet());

    // Create the File
    FileDTO fileDTO = fileMapper.toDto(file);

    // If the entity doesn't have an ID, it will throw BadRequestAlertException
    restFileMockMvc
      .perform(
        put(ENTITY_API_URL_ID, fileDTO.getId())
          .contentType(MediaType.APPLICATION_JSON)
          .content(TestUtil.convertObjectToJsonBytes(fileDTO))
      )
      .andExpect(status().isBadRequest());

    // Validate the File in the database
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeUpdate);

    // Validate the File in Elasticsearch
    verify(mockFileSearchRepository, times(0)).save(file);
  }

  @Test
  @Transactional
  void putWithIdMismatchFile() throws Exception
  {
    int databaseSizeBeforeUpdate = fileRepository.findAll().size();
    file.setId(count.incrementAndGet());

    // Create the File
    FileDTO fileDTO = fileMapper.toDto(file);

    // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    restFileMockMvc
      .perform(
        put(ENTITY_API_URL_ID, count.incrementAndGet())
          .contentType(MediaType.APPLICATION_JSON)
          .content(TestUtil.convertObjectToJsonBytes(fileDTO))
      )
      .andExpect(status().isBadRequest());

    // Validate the File in the database
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeUpdate);

    // Validate the File in Elasticsearch
    verify(mockFileSearchRepository, times(0)).save(file);
  }

  @Test
  @Transactional
  void putWithMissingIdPathParamFile() throws Exception
  {
    int databaseSizeBeforeUpdate = fileRepository.findAll().size();
    file.setId(count.incrementAndGet());

    // Create the File
    FileDTO fileDTO = fileMapper.toDto(file);

    // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    restFileMockMvc
      .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fileDTO)))
      .andExpect(status().isMethodNotAllowed());

    // Validate the File in the database
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeUpdate);

    // Validate the File in Elasticsearch
    verify(mockFileSearchRepository, times(0)).save(file);
  }

  @Test
  @Transactional
  void partialUpdateFileWithPatch() throws Exception
  {
    // Initialize the database
    fileRepository.saveAndFlush(file);

    int databaseSizeBeforeUpdate = fileRepository.findAll().size();

    // Update the file using partial update
    File partialUpdatedFile = new File();
    partialUpdatedFile.setId(file.getId());

    partialUpdatedFile
      .uuid(UPDATED_UUID)
      .pathFileOriginal(UPDATED_PATH_FILE_ORIGINAL)
      .nameFile(UPDATED_NAME_FILE)
      .typeFile(UPDATED_TYPE_FILE)
      .searchField(UPDATED_SEARCH_FIELD)
      .role(UPDATED_ROLE)
      .createdDate(UPDATED_CREATED_DATE);

    restFileMockMvc
      .perform(
        patch(ENTITY_API_URL_ID, partialUpdatedFile.getId())
          .contentType("application/merge-patch+json")
          .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFile))
      )
      .andExpect(status().isOk());

    // Validate the File in the database
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeUpdate);
    File testFile = fileList.get(fileList.size() - 1);
    assertThat(testFile.getUuid()).isEqualTo(UPDATED_UUID);
    assertThat(testFile.getPathFileOriginal()).isEqualTo(UPDATED_PATH_FILE_ORIGINAL);
    assertThat(testFile.getPathFileProcessed()).isEqualTo(DEFAULT_PATH_FILE_PROCESSED);
    assertThat(testFile.getNameFile()).isEqualTo(UPDATED_NAME_FILE);
    assertThat(testFile.getExtension()).isEqualTo(DEFAULT_EXTENSION);
    assertThat(testFile.getTypeFile()).isEqualTo(UPDATED_TYPE_FILE);
    assertThat(testFile.getProcessed()).isEqualTo(DEFAULT_PROCESSED);
    assertThat(testFile.getSearchField()).isEqualTo(UPDATED_SEARCH_FIELD);
    assertThat(testFile.getRole()).isEqualTo(UPDATED_ROLE);
    assertThat(testFile.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    assertThat(testFile.getModifiedDate()).isEqualTo(DEFAULT_MODIFIED_DATE);
    assertThat(testFile.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
    assertThat(testFile.getModifiedBy()).isEqualTo(DEFAULT_MODIFIED_BY);
    assertThat(testFile.getDataSize()).isEqualTo(DEFAULT_DATA_SIZE);
    assertThat(testFile.getComment()).isEqualTo(DEFAULT_COMMENT);
  }

  @Test
  @Transactional
  void fullUpdateFileWithPatch() throws Exception
  {
    // Initialize the database
    fileRepository.saveAndFlush(file);

    int databaseSizeBeforeUpdate = fileRepository.findAll().size();

    // Update the file using partial update
    File partialUpdatedFile = new File();
    partialUpdatedFile.setId(file.getId());

    partialUpdatedFile
      .uuid(UPDATED_UUID)
      .pathFileOriginal(UPDATED_PATH_FILE_ORIGINAL)
      .pathFileProcessed(UPDATED_PATH_FILE_PROCESSED)
      .nameFile(UPDATED_NAME_FILE)
      .extension(UPDATED_EXTENSION)
      .typeFile(UPDATED_TYPE_FILE)
      .processed(UPDATED_PROCESSED)
      .searchField(UPDATED_SEARCH_FIELD)
      .role(UPDATED_ROLE)
      .createdDate(UPDATED_CREATED_DATE)
      .modifiedDate(UPDATED_MODIFIED_DATE)
      .createdBy(UPDATED_CREATED_BY)
      .modifiedBy(UPDATED_MODIFIED_BY)
      .dataSize(UPDATED_DATA_SIZE)
      .comment(UPDATED_COMMENT);

    restFileMockMvc
      .perform(
        patch(ENTITY_API_URL_ID, partialUpdatedFile.getId())
          .contentType("application/merge-patch+json")
          .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFile))
      )
      .andExpect(status().isOk());

    // Validate the File in the database
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeUpdate);
    File testFile = fileList.get(fileList.size() - 1);
    assertThat(testFile.getUuid()).isEqualTo(UPDATED_UUID);
    assertThat(testFile.getPathFileOriginal()).isEqualTo(UPDATED_PATH_FILE_ORIGINAL);
    assertThat(testFile.getPathFileProcessed()).isEqualTo(UPDATED_PATH_FILE_PROCESSED);
    assertThat(testFile.getNameFile()).isEqualTo(UPDATED_NAME_FILE);
    assertThat(testFile.getExtension()).isEqualTo(UPDATED_EXTENSION);
    assertThat(testFile.getTypeFile()).isEqualTo(UPDATED_TYPE_FILE);
    assertThat(testFile.getProcessed()).isEqualTo(UPDATED_PROCESSED);
    assertThat(testFile.getSearchField()).isEqualTo(UPDATED_SEARCH_FIELD);
    assertThat(testFile.getRole()).isEqualTo(UPDATED_ROLE);
    assertThat(testFile.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    assertThat(testFile.getModifiedDate()).isEqualTo(UPDATED_MODIFIED_DATE);
    assertThat(testFile.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
    assertThat(testFile.getModifiedBy()).isEqualTo(UPDATED_MODIFIED_BY);
    assertThat(testFile.getDataSize()).isEqualTo(UPDATED_DATA_SIZE);
    assertThat(testFile.getComment()).isEqualTo(UPDATED_COMMENT);
  }

  @Test
  @Transactional
  void patchNonExistingFile() throws Exception
  {
    int databaseSizeBeforeUpdate = fileRepository.findAll().size();
    file.setId(count.incrementAndGet());

    // Create the File
    FileDTO fileDTO = fileMapper.toDto(file);

    // If the entity doesn't have an ID, it will throw BadRequestAlertException
    restFileMockMvc
      .perform(
        patch(ENTITY_API_URL_ID, fileDTO.getId())
          .contentType("application/merge-patch+json")
          .content(TestUtil.convertObjectToJsonBytes(fileDTO))
      )
      .andExpect(status().isBadRequest());

    // Validate the File in the database
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeUpdate);

    // Validate the File in Elasticsearch
    verify(mockFileSearchRepository, times(0)).save(file);
  }

  @Test
  @Transactional
  void patchWithIdMismatchFile() throws Exception
  {
    int databaseSizeBeforeUpdate = fileRepository.findAll().size();
    file.setId(count.incrementAndGet());

    // Create the File
    FileDTO fileDTO = fileMapper.toDto(file);

    // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    restFileMockMvc
      .perform(
        patch(ENTITY_API_URL_ID, count.incrementAndGet())
          .contentType("application/merge-patch+json")
          .content(TestUtil.convertObjectToJsonBytes(fileDTO))
      )
      .andExpect(status().isBadRequest());

    // Validate the File in the database
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeUpdate);

    // Validate the File in Elasticsearch
    verify(mockFileSearchRepository, times(0)).save(file);
  }

  @Test
  @Transactional
  void patchWithMissingIdPathParamFile() throws Exception
  {
    int databaseSizeBeforeUpdate = fileRepository.findAll().size();
    file.setId(count.incrementAndGet());

    // Create the File
    FileDTO fileDTO = fileMapper.toDto(file);

    // If url ID doesn't match entity ID, it will throw BadRequestAlertException
    restFileMockMvc
      .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(fileDTO)))
      .andExpect(status().isMethodNotAllowed());

    // Validate the File in the database
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeUpdate);

    // Validate the File in Elasticsearch
    verify(mockFileSearchRepository, times(0)).save(file);
  }

  @Test
  @Transactional
  void deleteFile() throws Exception
  {
    // Initialize the database
    fileRepository.saveAndFlush(file);

    int databaseSizeBeforeDelete = fileRepository.findAll().size();

    // Delete the file
    restFileMockMvc
      .perform(delete(ENTITY_API_URL_ID, file.getId()).accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isNoContent());

    // Validate the database contains one less item
    List<File> fileList = fileRepository.findAll();
    assertThat(fileList).hasSize(databaseSizeBeforeDelete - 1);

    // Validate the File in Elasticsearch
    verify(mockFileSearchRepository, times(1)).deleteById(file.getId());
  }

  @Test
  @Transactional
  void searchFile() throws Exception
  {
    // Configure the mock search repository
    // Initialize the database
    fileRepository.saveAndFlush(file);
    when(mockFileSearchRepository.search(queryStringQuery("id:" + file.getId()), PageRequest.of(0, 20)))
      .thenReturn(new PageImpl<>(Collections.singletonList(file), PageRequest.of(0, 1), 1));

    // Search the file
    restFileMockMvc
      .perform(get(ENTITY_SEARCH_API_URL + "?query=id:" + file.getId()))
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
      .andExpect(jsonPath("$.[*].id").value(hasItem(file.getId().intValue())))
      .andExpect(jsonPath("$.[*].uuid").value(hasItem(DEFAULT_UUID.toString())))
      .andExpect(jsonPath("$.[*].pathFileOriginal").value(hasItem(DEFAULT_PATH_FILE_ORIGINAL)))
      .andExpect(jsonPath("$.[*].pathFileProcessed").value(hasItem(DEFAULT_PATH_FILE_PROCESSED)))
      .andExpect(jsonPath("$.[*].nameFile").value(hasItem(DEFAULT_NAME_FILE)))
      .andExpect(jsonPath("$.[*].extension").value(hasItem(DEFAULT_EXTENSION)))
      .andExpect(jsonPath("$.[*].typeFile").value(hasItem(DEFAULT_TYPE_FILE)))
      .andExpect(jsonPath("$.[*].processed").value(hasItem(DEFAULT_PROCESSED.booleanValue())))
      .andExpect(jsonPath("$.[*].searchField").value(hasItem(DEFAULT_SEARCH_FIELD)))
      .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE)))
      .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
      .andExpect(jsonPath("$.[*].modifiedDate").value(hasItem(DEFAULT_MODIFIED_DATE.toString())))
      .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
      .andExpect(jsonPath("$.[*].modifiedBy").value(hasItem(DEFAULT_MODIFIED_BY)))
      .andExpect(jsonPath("$.[*].dataSize").value(hasItem(DEFAULT_DATA_SIZE.intValue())))
      .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)));
  }
}
