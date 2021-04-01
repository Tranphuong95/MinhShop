package org.regitiny.minhshop.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

/**
 * The File entity.\n@author yuvytung
 */
@Entity
@Table(name = "file")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "file")
public class File implements Serializable
{

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
  @SequenceGenerator(name = "sequenceGenerator")
  private Long id;

  /**
   * the uuid equivalent id (primary key)
   */
  @NotNull
  @Type(type = "uuid-char")
  @Column(name = "uuid", length = 36, nullable = false, unique = true)
  private UUID uuid;

  /**
   * pathFileOriginal path of File (original)
   */
  @Column(name = "path_file_original")
  private String pathFileOriginal;

  /**
   * pathFileProcessed path of File (processed)
   */
  @Column(name = "path_file_processed")
  private String pathFileProcessed;

  /**
   * name of file (Default is uuid + extension)
   */
  @Size(max = 1024)
  @Column(name = "name_file", length = 1024)
  private String nameFile;

  /**
   * extension of video (Example .mp4 ... )
   */
  @Size(max = 16)
  @Column(name = "extension", length = 16)
  private String extension;

  /**
   * typeFile
   */
  @Size(max = 32)
  @Column(name = "type_file", length = 32)
  private String typeFile;

  /**
   * file processed set value to true (default false)
   */
  @NotNull
  @Column(name = "processed", nullable = false)
  private Boolean processed;

  /**
   * searchField
   */
  @Lob
  @Column(name = "search_field")
  private String searchField;

  /**
   * role
   */
  @Size(max = 2048)
  @Column(name = "role", length = 2048)
  private String role;

  /**
   * createdDate
   */
  @Column(name = "created_date")
  private Instant createdDate;

  /**
   * modifiedDate
   */
  @Column(name = "modified_date")
  private Instant modifiedDate;

  /**
   * createdBy
   */
  @Column(name = "created_by")
  private String createdBy;

  /**
   * modifiedBy
   */
  @Column(name = "modified_by")
  private String modifiedBy;

  /**
   * dataSize
   */
  @Column(name = "data_size")
  private Long dataSize;

  /**
   * comment
   */
  @Size(max = 2048)
  @Column(name = "comment", length = 2048)
  private String comment;

  // jhipster-needle-entity-add-field - JHipster will add fields here
  public Long getId()
  {
    return id;
  }

  public void setId(Long id)
  {
    this.id = id;
  }

  public File id(Long id)
  {
    this.id = id;
    return this;
  }

  public UUID getUuid()
  {
    return this.uuid;
  }

  public File uuid(UUID uuid)
  {
    this.uuid = uuid;
    return this;
  }

  public void setUuid(UUID uuid)
  {
    this.uuid = uuid;
  }

  public String getPathFileOriginal()
  {
    return this.pathFileOriginal;
  }

  public void setPathFileOriginal(String pathFileOriginal)
  {
    this.pathFileOriginal = pathFileOriginal;
  }

  public File pathFileOriginal(String pathFileOriginal)
  {
    this.pathFileOriginal = pathFileOriginal;
    return this;
  }

  public String getPathFileProcessed()
  {
    return this.pathFileProcessed;
  }

  public void setPathFileProcessed(String pathFileProcessed)
  {
    this.pathFileProcessed = pathFileProcessed;
  }

  public File pathFileProcessed(String pathFileProcessed)
  {
    this.pathFileProcessed = pathFileProcessed;
    return this;
  }

  public String getNameFile()
  {
    return this.nameFile;
  }

  public File nameFile(String nameFile)
  {
    this.nameFile = nameFile;
    return this;
  }

  public void setNameFile(String nameFile)
  {
    this.nameFile = nameFile;
  }

  public String getExtension()
  {
    return this.extension;
  }

  public File extension(String extension)
  {
    this.extension = extension;
    return this;
  }

  public void setExtension(String extension)
  {
    this.extension = extension;
  }

  public String getTypeFile()
  {
    return this.typeFile;
  }

  public File typeFile(String typeFile)
  {
    this.typeFile = typeFile;
    return this;
  }

  public void setTypeFile(String typeFile)
  {
    this.typeFile = typeFile;
  }

  public Boolean getProcessed()
  {
    return this.processed;
  }

  public void setProcessed(Boolean processed)
  {
    this.processed = processed;
  }

  public File processed(Boolean processed)
  {
    this.processed = processed;
    return this;
  }

  public String getSearchField()
  {
    return this.searchField;
  }

  public File searchField(String searchField)
  {
    this.searchField = searchField;
    return this;
  }

  public void setSearchField(String searchField)
  {
    this.searchField = searchField;
  }

  public String getRole()
  {
    return this.role;
  }

  public File role(String role)
  {
    this.role = role;
    return this;
  }

  public void setRole(String role)
  {
    this.role = role;
  }

  public Instant getCreatedDate()
  {
    return this.createdDate;
  }

  public File createdDate(Instant createdDate)
  {
    this.createdDate = createdDate;
    return this;
  }

  public void setCreatedDate(Instant createdDate)
  {
    this.createdDate = createdDate;
  }

  public Instant getModifiedDate()
  {
    return this.modifiedDate;
  }

  public File modifiedDate(Instant modifiedDate)
  {
    this.modifiedDate = modifiedDate;
    return this;
  }

  public void setModifiedDate(Instant modifiedDate)
  {
    this.modifiedDate = modifiedDate;
  }

  public String getCreatedBy()
  {
    return this.createdBy;
  }

  public File createdBy(String createdBy)
  {
    this.createdBy = createdBy;
    return this;
  }

  public void setCreatedBy(String createdBy)
  {
    this.createdBy = createdBy;
  }

  public String getModifiedBy()
  {
    return this.modifiedBy;
  }

  public File modifiedBy(String modifiedBy)
  {
    this.modifiedBy = modifiedBy;
    return this;
  }

  public void setModifiedBy(String modifiedBy)
  {
    this.modifiedBy = modifiedBy;
  }

  public Long getDataSize()
  {
    return this.dataSize;
  }

  public File dataSize(Long dataSize)
  {
    this.dataSize = dataSize;
    return this;
  }

  public void setDataSize(Long dataSize)
  {
    this.dataSize = dataSize;
  }

  public String getComment()
  {
    return this.comment;
  }

  public File comment(String comment)
  {
    this.comment = comment;
    return this;
  }

  public void setComment(String comment)
  {
    this.comment = comment;
  }

  // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

  @Override
  public boolean equals(Object o)
  {
    if (this == o)
    {
      return true;
    }
    if (!(o instanceof File))
    {
      return false;
    }
    return id != null && id.equals(((File) o).id);
  }

  @Override
  public int hashCode()
  {
    // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
    return getClass().hashCode();
  }

  // prettier-ignore
  @Override
  public String toString()
  {
    return "File{" +
      "id=" + getId() +
      ", uuid='" + getUuid() + "'" +
      ", pathFileOriginal='" + getPathFileOriginal() + "'" +
      ", pathFileProcessed='" + getPathFileProcessed() + "'" +
      ", nameFile='" + getNameFile() + "'" +
      ", extension='" + getExtension() + "'" +
      ", typeFile='" + getTypeFile() + "'" +
      ", processed='" + getProcessed() + "'" +
      ", searchField='" + getSearchField() + "'" +
      ", role='" + getRole() + "'" +
      ", createdDate='" + getCreatedDate() + "'" +
      ", modifiedDate='" + getModifiedDate() + "'" +
      ", createdBy='" + getCreatedBy() + "'" +
      ", modifiedBy='" + getModifiedBy() + "'" +
      ", dataSize=" + getDataSize() +
      ", comment='" + getComment() + "'" +
      "}";
  }
}
