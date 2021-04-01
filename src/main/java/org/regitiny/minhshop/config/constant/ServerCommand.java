package org.regitiny.minhshop.config.constant;


import lombok.Getter;
import lombok.extern.log4j.Log4j2;
import org.regitiny.tools.magic.constant.StringPool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
@Log4j2
public class ServerCommand
{
  private static final String FILE_NAME_INPUT = "${fileNameInput}";
  private static final String FILE_NAME_OUTPUT = "${fileNameOutput}";
  private static final String CUSTOM_OPTION = "${customOption}";
  @Getter
  private static String FOLDER_OUTPUT;
  @Getter
  private static String FOLDER_INPUT;

  public static String ffmpegVideoQualityReductionNormal(String fileName)
  {
    return ffmpegCustom(fileName, null, " -preset fast -crf 26 ");
  }

  public static String ffmpegVideoQualityReductionLittle(String fileName)
  {
    return ffmpegCustom(fileName, null, " -preset ultrafast -crf 24 ");
  }

  public static String ffmpegVideoQualityReductionGreat(String fileName)
  {
    return ffmpegCustom(fileName, null, " -preset veryslow -crf 28 ");
  }

  public static String ffmpegCustom(String fileNameInput, String fileNameOutput, String customOption)
  {
    String command = "ffmpeg -i " +
      FOLDER_INPUT + FILE_NAME_INPUT +
      " -y -c:v libx264 -c:a copy " +
      CUSTOM_OPTION + StringPool.SPACE +
      FOLDER_OUTPUT + FILE_NAME_OUTPUT;
    if (customOption == null || customOption.equals(StringPool.BLANK))
      customOption = " -preset slower -crf 28 ";
    if (fileNameOutput == null || fileNameOutput.equals(StringPool.BLANK))
      fileNameOutput = fileNameInput;
    command = command.replace(CUSTOM_OPTION, customOption);
    command = command.replace(FILE_NAME_INPUT, fileNameInput).replace(FILE_NAME_OUTPUT, fileNameOutput);
    log.debug(command);
    return command;
  }

  @Autowired
  private void setProperties(
    @Value("${yuvytung.data.video.folder-original:/root/minh-shop/data/video/original/}") String fi,
    @Value("${yuvytung.data.video.folder-processed:/root/minh-shop/data/video/processed/}") String fo
  )
  {
    FOLDER_INPUT = fi;
    FOLDER_OUTPUT = fo;
    log.debug("mkdir folder {} is : {}", fi, new File(fi).mkdirs());
    log.debug("mkdir folder {} is : {}", fo, new File(fo).mkdirs());
  }

}
