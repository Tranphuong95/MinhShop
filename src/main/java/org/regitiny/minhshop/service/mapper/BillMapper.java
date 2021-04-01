package org.regitiny.minhshop.service.mapper;

import org.mapstruct.*;
import org.regitiny.minhshop.domain.Bill;
import org.regitiny.minhshop.service.dto.BillDTO;

/**
 * Mapper for the entity {@link Bill} and its DTO {@link BillDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserOtherInfoMapper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BillMapper extends EntityMapper<BillDTO, Bill>
{
  @Mapping(target = "userOtherInfo", source = "userOtherInfo", qualifiedByName = "id")
  BillDTO toDto(Bill s);


  @Mapping(target = "payment", ignore = true)
  Bill toEntity(BillDTO s);


  @Named("billId")
  @BeanMapping(ignoreByDefault = true)
  @Mapping(target = "id", source = "id")
  @Mapping(target = "billId", source = "billId")
  BillDTO toDtoBillId(Bill bill);
}
