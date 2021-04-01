import {by, element, ElementFinder, protractor} from 'protractor';
import {isVisible, waitUntilDisplayed, waitUntilHidden} from '../../util/utils';

const expect = chai.expect;

export default class FileUpdatePage
{
  pageTitle: ElementFinder = element(by.id('minhShopApp.file.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  uuidInput: ElementFinder = element(by.css('input#file-uuid'));
  pathFileOriginalInput: ElementFinder = element(by.css('input#file-pathFileOriginal'));
  pathFileProcessedInput: ElementFinder = element(by.css('input#file-pathFileProcessed'));
  nameFileInput: ElementFinder = element(by.css('input#file-nameFile'));
  extensionInput: ElementFinder = element(by.css('input#file-extension'));
  typeFileInput: ElementFinder = element(by.css('input#file-typeFile'));
  processedInput: ElementFinder = element(by.css('input#file-processed'));
  searchFieldInput: ElementFinder = element(by.css('textarea#file-searchField'));
  roleInput: ElementFinder = element(by.css('input#file-role'));
  createdDateInput: ElementFinder = element(by.css('input#file-createdDate'));
  modifiedDateInput: ElementFinder = element(by.css('input#file-modifiedDate'));
  createdByInput: ElementFinder = element(by.css('input#file-createdBy'));
  modifiedByInput: ElementFinder = element(by.css('input#file-modifiedBy'));
  dataSizeInput: ElementFinder = element(by.css('input#file-dataSize'));
  commentInput: ElementFinder = element(by.css('input#file-comment'));

  getPageTitle()
  {
    return this.pageTitle;
  }

  async setUuidInput(uuid)
  {
    await this.uuidInput.sendKeys(uuid);
  }

  async getUuidInput()
  {
    return this.uuidInput.getAttribute('value');
  }

  async setPathFileOriginalInput(pathFileOriginal)
  {
    await this.pathFileOriginalInput.sendKeys(pathFileOriginal);
  }

  async getPathFileOriginalInput()
  {
    return this.pathFileOriginalInput.getAttribute('value');
  }

  async setPathFileProcessedInput(pathFileProcessed)
  {
    await this.pathFileProcessedInput.sendKeys(pathFileProcessed);
  }

  async getPathFileProcessedInput()
  {
    return this.pathFileProcessedInput.getAttribute('value');
  }

  async setNameFileInput(nameFile)
  {
    await this.nameFileInput.sendKeys(nameFile);
  }

  async getNameFileInput()
  {
    return this.nameFileInput.getAttribute('value');
  }

  async setExtensionInput(extension)
  {
    await this.extensionInput.sendKeys(extension);
  }

  async getExtensionInput()
  {
    return this.extensionInput.getAttribute('value');
  }

  async setTypeFileInput(typeFile)
  {
    await this.typeFileInput.sendKeys(typeFile);
  }

  async getTypeFileInput()
  {
    return this.typeFileInput.getAttribute('value');
  }

  getProcessedInput()
  {
    return this.processedInput;
  }

  async setSearchFieldInput(searchField)
  {
    await this.searchFieldInput.sendKeys(searchField);
  }

  async getSearchFieldInput()
  {
    return this.searchFieldInput.getAttribute('value');
  }

  async setRoleInput(role)
  {
    await this.roleInput.sendKeys(role);
  }

  async getRoleInput()
  {
    return this.roleInput.getAttribute('value');
  }

  async setCreatedDateInput(createdDate)
  {
    await this.createdDateInput.sendKeys(createdDate);
  }

  async getCreatedDateInput()
  {
    return this.createdDateInput.getAttribute('value');
  }

  async setModifiedDateInput(modifiedDate)
  {
    await this.modifiedDateInput.sendKeys(modifiedDate);
  }

  async getModifiedDateInput()
  {
    return this.modifiedDateInput.getAttribute('value');
  }

  async setCreatedByInput(createdBy)
  {
    await this.createdByInput.sendKeys(createdBy);
  }

  async getCreatedByInput()
  {
    return this.createdByInput.getAttribute('value');
  }

  async setModifiedByInput(modifiedBy)
  {
    await this.modifiedByInput.sendKeys(modifiedBy);
  }

  async getModifiedByInput()
  {
    return this.modifiedByInput.getAttribute('value');
  }

  async setDataSizeInput(dataSize)
  {
    await this.dataSizeInput.sendKeys(dataSize);
  }

  async getDataSizeInput()
  {
    return this.dataSizeInput.getAttribute('value');
  }

  async setCommentInput(comment)
  {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput()
  {
    return this.commentInput.getAttribute('value');
  }

  async save()
  {
    await this.saveButton.click();
  }

  async cancel()
  {
    await this.cancelButton.click();
  }

  getSaveButton()
  {
    return this.saveButton;
  }

  async enterData()
  {
    await waitUntilDisplayed(this.saveButton);
    await this.setUuidInput('64c99148-3908-465d-8c4a-e510e3ade974');
    expect(await this.getUuidInput()).to.match(/64c99148-3908-465d-8c4a-e510e3ade974/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPathFileOriginalInput('pathFileOriginal');
    expect(await this.getPathFileOriginalInput()).to.match(/pathFileOriginal/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPathFileProcessedInput('pathFileProcessed');
    expect(await this.getPathFileProcessedInput()).to.match(/pathFileProcessed/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNameFileInput('nameFile');
    expect(await this.getNameFileInput()).to.match(/nameFile/);
    await waitUntilDisplayed(this.saveButton);
    await this.setExtensionInput('extension');
    expect(await this.getExtensionInput()).to.match(/extension/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTypeFileInput('typeFile');
    expect(await this.getTypeFileInput()).to.match(/typeFile/);
    await waitUntilDisplayed(this.saveButton);
    const selectedProcessed = await this.getProcessedInput().isSelected();
    if (selectedProcessed)
    {
      await this.getProcessedInput().click();
      expect(await this.getProcessedInput().isSelected()).to.be.false;
    }
    else
    {
      await this.getProcessedInput().click();
      expect(await this.getProcessedInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setSearchFieldInput('searchField');
    expect(await this.getSearchFieldInput()).to.match(/searchField/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRoleInput('role');
    expect(await this.getRoleInput()).to.match(/role/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getModifiedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedByInput('createdBy');
    expect(await this.getCreatedByInput()).to.match(/createdBy/);
    await waitUntilDisplayed(this.saveButton);
    await this.setModifiedByInput('modifiedBy');
    expect(await this.getModifiedByInput()).to.match(/modifiedBy/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDataSizeInput('5');
    expect(await this.getDataSizeInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommentInput('comment');
    expect(await this.getCommentInput()).to.match(/comment/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
