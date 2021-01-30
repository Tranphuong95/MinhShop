package org.regitiny.minhshop.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import org.springframework.data.elasticsearch.annotations.FieldType;

/**
 * The Image entity.\n@author yuvytung
 */
@Entity
@Table(name = "image")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "image")
public class Image implements Serializable {

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
    @Column(name = "uuid", length = 36, nullable = false)
    private UUID uuid;

    /**
     * imageData is data of image in binary form
     */

    @Lob
    @Column(name = "image_data", nullable = false)
    private byte[] imageData;

    @Column(name = "image_data_content_type", nullable = false)
    private String imageDataContentType;

    /**
     * name of image (Default is uuid + extension)
     */
    @Size(max = 1024)
    @Column(name = "name_image", length = 1024)
    private String nameImage;

    /**
     * extension of image (Example .jpg .png ... )
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
     * role
     */
    @NotNull
    @Column(name = "role", nullable = false)
    private String role;

    /**
     * createdDate
     */
    @NotNull
    @Column(name = "created_date", nullable = false)
    private Instant createdDate;

    /**
     * modifiedDate
     */
    @NotNull
    @Column(name = "modified_date", nullable = false)
    private Instant modifiedDate;

    /**
     * createdBy
     */
    @NotNull
    @Column(name = "created_by", nullable = false)
    private String createdBy;

    /**
     * modifiedBy
     */
    @NotNull
    @Column(name = "modified_by", nullable = false)
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

    /**
     * deleted (deleted set to true , not delete set to false)
     */
    @Column(name = "deleted")
    private Boolean deleted;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Image id(Long id) {
        this.id = id;
        return this;
    }

    public UUID getUuid() {
        return this.uuid;
    }

    public Image uuid(UUID uuid) {
        this.uuid = uuid;
        return this;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public byte[] getImageData() {
        return this.imageData;
    }

    public Image imageData(byte[] imageData) {
        this.imageData = imageData;
        return this;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public String getImageDataContentType() {
        return this.imageDataContentType;
    }

    public Image imageDataContentType(String imageDataContentType) {
        this.imageDataContentType = imageDataContentType;
        return this;
    }

    public void setImageDataContentType(String imageDataContentType) {
        this.imageDataContentType = imageDataContentType;
    }

    public String getNameImage() {
        return this.nameImage;
    }

    public Image nameImage(String nameImage) {
        this.nameImage = nameImage;
        return this;
    }

    public void setNameImage(String nameImage) {
        this.nameImage = nameImage;
    }

    public String getExtension() {
        return this.extension;
    }

    public Image extension(String extension) {
        this.extension = extension;
        return this;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public String getTypeFile() {
        return this.typeFile;
    }

    public Image typeFile(String typeFile) {
        this.typeFile = typeFile;
        return this;
    }

    public void setTypeFile(String typeFile) {
        this.typeFile = typeFile;
    }

    public String getRole() {
        return this.role;
    }

    public Image role(String role) {
        this.role = role;
        return this;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Instant getCreatedDate() {
        return this.createdDate;
    }

    public Image createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getModifiedDate() {
        return this.modifiedDate;
    }

    public Image modifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getCreatedBy() {
        return this.createdBy;
    }

    public Image createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getModifiedBy() {
        return this.modifiedBy;
    }

    public Image modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Long getDataSize() {
        return this.dataSize;
    }

    public Image dataSize(Long dataSize) {
        this.dataSize = dataSize;
        return this;
    }

    public void setDataSize(Long dataSize) {
        this.dataSize = dataSize;
    }

    public String getComment() {
        return this.comment;
    }

    public Image comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Boolean getDeleted() {
        return this.deleted;
    }

    public Image deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Image)) {
            return false;
        }
        return id != null && id.equals(((Image) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Image{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", imageData='" + getImageData() + "'" +
            ", imageDataContentType='" + getImageDataContentType() + "'" +
            ", nameImage='" + getNameImage() + "'" +
            ", extension='" + getExtension() + "'" +
            ", typeFile='" + getTypeFile() + "'" +
            ", role='" + getRole() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            ", dataSize=" + getDataSize() +
            ", comment='" + getComment() + "'" +
            ", deleted='" + getDeleted() + "'" +
            "}";
    }
}
