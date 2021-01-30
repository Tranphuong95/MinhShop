package org.regitiny.minhshop.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import org.springframework.data.elasticsearch.annotations.FieldType;

/**
 * The TypeFilter entity.\n@author a true jhipster
 */
@Entity
@Table(name = "type_post_filter")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "typepostfilter")
public class TypePostFilter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * uuid
     */
    @NotNull
    @Type(type = "uuid-char")
    @Column(name = "uuid", length = 36, nullable = false, unique = true)
    private UUID uuid;

    /**
     * typeFilterName
     */
    @NotNull
    @Column(name = "type_filter_name", nullable = false, unique = true)
    private String typeFilterName;

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

    @ManyToMany(mappedBy = "typePostFilters")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "postDetails", "typePost", "typePostFilters" }, allowSetters = true)
    private Set<SimplePost> simplePosts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TypePostFilter id(Long id) {
        this.id = id;
        return this;
    }

    public UUID getUuid() {
        return this.uuid;
    }

    public TypePostFilter uuid(UUID uuid) {
        this.uuid = uuid;
        return this;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getTypeFilterName() {
        return this.typeFilterName;
    }

    public TypePostFilter typeFilterName(String typeFilterName) {
        this.typeFilterName = typeFilterName;
        return this;
    }

    public void setTypeFilterName(String typeFilterName) {
        this.typeFilterName = typeFilterName;
    }

    public Instant getCreatedDate() {
        return this.createdDate;
    }

    public TypePostFilter createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getModifiedDate() {
        return this.modifiedDate;
    }

    public TypePostFilter modifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getCreatedBy() {
        return this.createdBy;
    }

    public TypePostFilter createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getModifiedBy() {
        return this.modifiedBy;
    }

    public TypePostFilter modifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Set<SimplePost> getSimplePosts() {
        return this.simplePosts;
    }

    public TypePostFilter simplePosts(Set<SimplePost> simplePosts) {
        this.setSimplePosts(simplePosts);
        return this;
    }

    public TypePostFilter addSimplePost(SimplePost simplePost) {
        this.simplePosts.add(simplePost);
        simplePost.getTypePostFilters().add(this);
        return this;
    }

    public TypePostFilter removeSimplePost(SimplePost simplePost) {
        this.simplePosts.remove(simplePost);
        simplePost.getTypePostFilters().remove(this);
        return this;
    }

    public void setSimplePosts(Set<SimplePost> simplePosts) {
        if (this.simplePosts != null) {
            this.simplePosts.forEach(i -> i.removeTypePostFilter(this));
        }
        if (simplePosts != null) {
            simplePosts.forEach(i -> i.addTypePostFilter(this));
        }
        this.simplePosts = simplePosts;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TypePostFilter)) {
            return false;
        }
        return id != null && id.equals(((TypePostFilter) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TypePostFilter{" +
            "id=" + getId() +
            ", uuid='" + getUuid() + "'" +
            ", typeFilterName='" + getTypeFilterName() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", modifiedBy='" + getModifiedBy() + "'" +
            "}";
    }
}
