package org.regitiny.minhshop.service.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link org.regitiny.minhshop.domain.TypePost} entity.
 */
@ApiModel(description = "The TypePost entity.\n@author a true jhipster")
public class TypePostDTO implements Serializable {

    private Long id;

    /**
     * uuid
     */
    @NotNull
    @ApiModelProperty(value = "uuid", required = true)
    private UUID uuid;

    /**
     * typeName
     */
    @NotNull
    @ApiModelProperty(value = "typeName", required = true)
    private String typeName;

    /**
     * createdDate
     */
    @NotNull
    @ApiModelProperty(value = "createdDate", required = true)
    private Instant createdDate;

    /**
     * modifiedDate
     */
    @NotNull
    @ApiModelProperty(value = "modifiedDate", required = true)
    private Instant modifiedDate;

    /**
     * createdBy
     */
    @NotNull
    @ApiModelProperty(value = "createdBy", required = true)
    private String createdBy;

    /**
     * modifiedBy
     */
    @NotNull
    @ApiModelProperty(value = "modifiedBy", required = true)
    private String modifiedBy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TypePostDTO)) {
            return false;
        }

        TypePostDTO typePostDTO = (TypePostDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, typePostDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TypePostDTO{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", typeName='" + getTypeName() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            "}";
    }
}
