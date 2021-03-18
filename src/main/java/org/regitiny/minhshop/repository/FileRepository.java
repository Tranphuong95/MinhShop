package org.regitiny.minhshop.repository;

import org.regitiny.minhshop.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data SQL repository for the File entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FileRepository extends JpaRepository<File, Long>
{
  Optional<File> findByNameFile(String fileName);
}
