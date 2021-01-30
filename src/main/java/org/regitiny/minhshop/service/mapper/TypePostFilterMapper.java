package org.regitiny.minhshop.service.mapper;

import java.util.Set;
import org.mapstruct.*;
import org.regitiny.minhshop.domain.*;
import org.regitiny.minhshop.service.dto.TypePostFilterDTO;

/**
 * Mapper for the entity {@link TypePostFilter} and its DTO {@link TypePostFilterDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TypePostFilterMapper extends EntityMapper<TypePostFilterDTO, TypePostFilter> {
    @Named("typeFilterNameSet")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "typeFilterName", source = "typeFilterName")
    Set<TypePostFilterDTO> toDtoTypeFilterNameSet(Set<TypePostFilter> typePostFilter);
}
