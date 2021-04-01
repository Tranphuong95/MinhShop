package org.regitiny.minhshop.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.regitiny.minhshop.domain.SimplePost;
import org.regitiny.minhshop.service.dto.SimplePostDTO;

/**
 * Mapper for the entity {@link SimplePost} and its DTO {@link SimplePostDTO}.
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring", uses = {PostDetailsMapper.class, TypePostMapper.class, TypePostFilterMapper.class})
public interface SimplePostMapper extends EntityMapper<SimplePostDTO, SimplePost>
{
  @Mapping(target = "postDetails", source = "postDetails", qualifiedByName = "postDetailsId")
  @Mapping(target = "typePost", source = "typePost", qualifiedByName = "typeName")
  @Mapping(target = "typePostFilters", source = "typePostFilters", qualifiedByName = "typeFilterNameSet")
  SimplePostDTO toDto(SimplePost s);

//  //  yuvytung: practical experience
//  @Mapping(target = "postDetails",source = "postDetails" ,qualifiedByName = "postDetailIgnoreSimplePost")
//  @Mapping(target = "typePostFilters", source = "typePostFilters", qualifiedByName = "typePostFilterIgnoreSimplePostSet")
//  @Mapping(target = "removeTypePostFilter", ignore = true)
//  SimplePost cleanNested(SimplePost s);


  @Mapping(target = "removeTypePostFilter", ignore = true)
  SimplePost toEntity(SimplePostDTO simplePostDTO);
}
