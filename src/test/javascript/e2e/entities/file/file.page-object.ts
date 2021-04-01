import {by, element, ElementArrayFinder, ElementFinder} from 'protractor';

import {click, isVisible, waitUntilAnyDisplayed, waitUntilDisplayed, waitUntilHidden} from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import FileUpdatePage from './file-update.page-object';

const expect = chai.expect;
export class FileDeleteDialog
{
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('minhShopApp.file.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-file'));

  getDialogTitle()
  {
    return this.dialogTitle;
  }

  async clickOnConfirmButton()
  {
    await this.confirmButton.click();
  }
}

export default class FileComponentsPage
{
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('file-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder)
  {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder)
  {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder)
  {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage)
  {
    await navBarPage.getEntityPage('file');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFile()
  {
    await this.createButton.click();
    return new FileUpdatePage();
  }

  async deleteFile()
  {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const fileDeleteDialog = new FileDeleteDialog();
    await waitUntilDisplayed(fileDeleteDialog.deleteModal);
    expect(await fileDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/minhShopApp.file.delete.question/);
    await fileDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fileDeleteDialog.deleteModal);

    expect(await isVisible(fileDeleteDialog.deleteModal)).to.be.false;
  }
}
