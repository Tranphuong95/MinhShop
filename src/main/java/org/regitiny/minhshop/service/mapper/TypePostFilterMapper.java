package org.regitiny.minhshop.service.mapper;

import org.mapstruct.*;
import org.regitiny.minhshop.domain.TypePostFilter;
import org.regitiny.minhshop.service.dto.TypePostFilterDTO;

import java.util.Set;

/**
 * Mapper for the entity {@link TypePostFilter} and its DTO {@link TypePostFilterDTO}.
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring", uses = {})
public interface TypePostFilterMapper extends EntityMapper<TypePostFilterDTO, TypePostFilter>
{
  @Named("typeFilterNameSet")
  @BeanMapping(ignoreByDefault = true)
  @Mapping(target = "id", source = "id")
  @Mapping(target = "typeFilterName", source = "typeFilterName")
  Set<TypePostFilterDTO> toDtoTypeFilterNameSet(Set<TypePostFilter> typePostFilter);


  @Override
  @Mapping(target = "simplePosts", ignore = true)
  @Mapping(target = "removeSimplePost", ignore = true)
  TypePostFilter toEntity(TypePostFilterDTO typePostFilterDTO);


//  //  yuvytung: practical experience
//  @Named("typePostFilterIgnoreSimplePostSet")
//  default Set<TypePostFilter> typePostFilterIgnoreSimplePostSet(Set<TypePostFilter> typePostFilters)
//  {
//    Set<TypePostFilter> result = new HashSet<>();
//
//    typePostFilters.forEach(typePostFilter ->
//    {
//      typePostFilter.clearSimplePosts();
//      result.add(typePostFilter);
//    });
//    return result;
//  }


}
