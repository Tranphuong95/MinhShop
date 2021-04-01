package org.regitiny.minhshop.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.regitiny.minhshop.domain.File;
import org.regitiny.minhshop.service.dto.FileDTO;

/**
 * Mapper for the entity {@link File} and its DTO {@link FileDTO}.
 */
@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FileMapper extends EntityMapper<FileDTO, File>
{
}
