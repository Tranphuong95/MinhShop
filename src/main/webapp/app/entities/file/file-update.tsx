import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row, UncontrolledTooltip} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {setFileData, Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';

import {createEntity, getEntity, reset, setBlob, updateEntity} from './file.reducer';
import {convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime} from 'app/shared/util/date-utils';

export interface IFileUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }>
{
}

export const FileUpdate = (props: IFileUpdateProps) =>
{
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const {fileEntity, loading, updating} = props;

  const {searchField} = fileEntity;

  const handleClose = () =>
  {
    props.history.push('/file');
  };

  useEffect(() =>
  {
    if (!isNew)
    {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const onBlobChange = (isAnImage, name) => event =>
  {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () =>
  {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() =>
  {
    if (props.updateSuccess)
    {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) =>
  {
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.modifiedDate = convertDateTimeToServer(values.modifiedDate);

    if (errors.length === 0)
    {
      const entity = {
        ...fileEntity,
        ...values,
      };

      if (isNew)
      {
        props.createEntity(entity);
      }
      else
      {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="minhShopApp.file.home.createOrEditLabel" data-cy="FileCreateUpdateHeading">
            <Translate contentKey="minhShopApp.file.home.createOrEditLabel">Create or edit a File</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fileEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="file-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="file-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="uuidLabel" for="file-uuid">
                  <Translate contentKey="minhShopApp.file.uuid">Uuid</Translate>
                </Label>
                <AvField
                  id="file-uuid"
                  data-cy="uuid"
                  type="text"
                  name="uuid"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')},
                  }}
                />
                <UncontrolledTooltip target="uuidLabel">
                  <Translate contentKey="minhShopApp.file.help.uuid"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="pathFileOriginalLabel" for="file-pathFileOriginal">
                  <Translate contentKey="minhShopApp.file.pathFileOriginal">Path File Original</Translate>
                </Label>
                <AvField id="file-pathFileOriginal" data-cy="pathFileOriginal" type="text" name="pathFileOriginal"/>
                <UncontrolledTooltip target="pathFileOriginalLabel">
                  <Translate contentKey="minhShopApp.file.help.pathFileOriginal"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="pathFileProcessedLabel" for="file-pathFileProcessed">
                  <Translate contentKey="minhShopApp.file.pathFileProcessed">Path File Processed</Translate>
                </Label>
                <AvField id="file-pathFileProcessed" data-cy="pathFileProcessed" type="text" name="pathFileProcessed"/>
                <UncontrolledTooltip target="pathFileProcessedLabel">
                  <Translate contentKey="minhShopApp.file.help.pathFileProcessed"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="nameFileLabel" for="file-nameFile">
                  <Translate contentKey="minhShopApp.file.nameFile">Name File</Translate>
                </Label>
                <AvField
                  id="file-nameFile"
                  data-cy="nameFile"
                  type="text"
                  name="nameFile"
                  validate={{
                    maxLength: {value: 1024, errorMessage: translate('entity.validation.maxlength', {max: 1024})},
                  }}
                />
                <UncontrolledTooltip target="nameFileLabel">
                  <Translate contentKey="minhShopApp.file.help.nameFile"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="extensionLabel" for="file-extension">
                  <Translate contentKey="minhShopApp.file.extension">Extension</Translate>
                </Label>
                <AvField
                  id="file-extension"
                  data-cy="extension"
                  type="text"
                  name="extension"
                  validate={{
                    maxLength: {value: 16, errorMessage: translate('entity.validation.maxlength', {max: 16})},
                  }}
                />
                <UncontrolledTooltip target="extensionLabel">
                  <Translate contentKey="minhShopApp.file.help.extension"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="typeFileLabel" for="file-typeFile">
                  <Translate contentKey="minhShopApp.file.typeFile">Type File</Translate>
                </Label>
                <AvField
                  id="file-typeFile"
                  data-cy="typeFile"
                  type="text"
                  name="typeFile"
                  validate={{
                    maxLength: {value: 32, errorMessage: translate('entity.validation.maxlength', {max: 32})},
                  }}
                />
                <UncontrolledTooltip target="typeFileLabel">
                  <Translate contentKey="minhShopApp.file.help.typeFile"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup check>
                <Label id="processedLabel">
                  <AvInput id="file-processed" data-cy="processed" type="checkbox" className="form-check-input" name="processed"/>
                  <Translate contentKey="minhShopApp.file.processed">Processed</Translate>
                </Label>
                <UncontrolledTooltip target="processedLabel">
                  <Translate contentKey="minhShopApp.file.help.processed"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="searchFieldLabel" for="file-searchField">
                  <Translate contentKey="minhShopApp.file.searchField">Search Field</Translate>
                </Label>
                <AvInput id="file-searchField" data-cy="searchField" type="textarea" name="searchField"/>
                <UncontrolledTooltip target="searchFieldLabel">
                  <Translate contentKey="minhShopApp.file.help.searchField"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="roleLabel" for="file-role">
                  <Translate contentKey="minhShopApp.file.role">Role</Translate>
                </Label>
                <AvField
                  id="file-role"
                  data-cy="role"
                  type="text"
                  name="role"
                  validate={{
                    maxLength: {value: 2048, errorMessage: translate('entity.validation.maxlength', {max: 2048})},
                  }}
                />
                <UncontrolledTooltip target="roleLabel">
                  <Translate contentKey="minhShopApp.file.help.role"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="file-createdDate">
                  <Translate contentKey="minhShopApp.file.createdDate">Created Date</Translate>
                </Label>
                <AvInput
                  id="file-createdDate"
                  data-cy="createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.fileEntity.createdDate)}
                />
                <UncontrolledTooltip target="createdDateLabel">
                  <Translate contentKey="minhShopApp.file.help.createdDate"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="modifiedDateLabel" for="file-modifiedDate">
                  <Translate contentKey="minhShopApp.file.modifiedDate">Modified Date</Translate>
                </Label>
                <AvInput
                  id="file-modifiedDate"
                  data-cy="modifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="modifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.fileEntity.modifiedDate)}
                />
                <UncontrolledTooltip target="modifiedDateLabel">
                  <Translate contentKey="minhShopApp.file.help.modifiedDate"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="file-createdBy">
                  <Translate contentKey="minhShopApp.file.createdBy">Created By</Translate>
                </Label>
                <AvField id="file-createdBy" data-cy="createdBy" type="text" name="createdBy"/>
                <UncontrolledTooltip target="createdByLabel">
                  <Translate contentKey="minhShopApp.file.help.createdBy"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="modifiedByLabel" for="file-modifiedBy">
                  <Translate contentKey="minhShopApp.file.modifiedBy">Modified By</Translate>
                </Label>
                <AvField id="file-modifiedBy" data-cy="modifiedBy" type="text" name="modifiedBy"/>
                <UncontrolledTooltip target="modifiedByLabel">
                  <Translate contentKey="minhShopApp.file.help.modifiedBy"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="dataSizeLabel" for="file-dataSize">
                  <Translate contentKey="minhShopApp.file.dataSize">Data Size</Translate>
                </Label>
                <AvField id="file-dataSize" data-cy="dataSize" type="string" className="form-control" name="dataSize"/>
                <UncontrolledTooltip target="dataSizeLabel">
                  <Translate contentKey="minhShopApp.file.help.dataSize"/>
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="commentLabel" for="file-comment">
                  <Translate contentKey="minhShopApp.file.comment">Comment</Translate>
                </Label>
                <AvField
                  id="file-comment"
                  data-cy="comment"
                  type="text"
                  name="comment"
                  validate={{
                    maxLength: {value: 2048, errorMessage: translate('entity.validation.maxlength', {max: 2048})},
                  }}
                />
                <UncontrolledTooltip target="commentLabel">
                  <Translate contentKey="minhShopApp.file.help.comment"/>
                </UncontrolledTooltip>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/file" replace color="info">
                <FontAwesomeIcon icon="arrow-left"/>
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save"/>
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  fileEntity: storeState.file.entity,
  loading: storeState.file.loading,
  updating: storeState.file.updating,
  updateSuccess: storeState.file.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileUpdate);
