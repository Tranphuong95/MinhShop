package org.regitiny.minhshop.service.mapper;

import org.mapstruct.*;
import org.regitiny.minhshop.domain.UserOtherInfo;
import org.regitiny.minhshop.service.dto.UserOtherInfoDTO;

/**
 * Mapper for the entity {@link UserOtherInfo} and its DTO {@link UserOtherInfoDTO}.
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring", uses = {UserMapper.class})
public interface UserOtherInfoMapper extends EntityMapper<UserOtherInfoDTO, UserOtherInfo>
{
  @Mapping(target = "userName", source = "userName", qualifiedByName = "login")
  UserOtherInfoDTO toDto(UserOtherInfo s);


  UserOtherInfo toEntity(UserOtherInfoDTO userOtherInfoDTO);


  @Named("id")
  @BeanMapping(ignoreByDefault = true)
  @Mapping(target = "id", source = "id")
  UserOtherInfoDTO toDtoId(UserOtherInfo userOtherInfo);
}
