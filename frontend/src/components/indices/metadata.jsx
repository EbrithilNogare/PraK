import React from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import lodashSet from 'lodash.set'
import lodashGet from 'lodash.get'
import {
    Select,
    TextField,
    Button,
    InputLabel,
    MenuItem,
    FormControl,
    Paper,
    Tooltip,
} from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'

import {
    CorporationComboBox,
    CreationComboBox,
    FamilyComboBox,
    FormStaticComboBox,
    GeographicComboBox,
    KeywordComboBox,
    MetadataComboBox,
    PersonComboBox,
    StaticComboBox,
    SubjectComboBox,
} from '../comboBoxes'
import DateField from '../validationTextFields/DateField'
import RegExpField from '../validationTextFields/RegExpField'
import Multiplier from '../Multiplier'
import IndexParent from './indexParent'
import styles from './parent.module.scss'
import typeDefinitionFile from './metadataTypes.json'
import LabeledCheckbox from '../LabeledCheckbox'
import FoldablePaper from '../../components/FoldablePaper'
import UniqueTextField from '../../components/UniqueTextField'
import UploadFile from '../../components/UploadFile'

class Metadata extends IndexParent {
    constructor(props) {
        super(props)

        this.formData.documentType = this.props.defaults
            ? this.props.defaults.documentType || 0
            : 0

        this.state = {
            documentType: this.formData.documentType,
            helpersVisible: false,
        }

        this.indexURL = 'metadata'
    }

    conditionalField = (fieldName) =>
        this.getTypeDefinition(fieldName).fields[this.state.documentType] === 1

    getTypeDefinition = (fieldName) => {
        return typeDefinitionFile.properties[fieldName]
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className={styles.main}
                onKeyPress={(event) => {
                    if (event.which === 13) event.preventDefault()
                }}
            >
                <Paper className={styles.header}>
                    {this.props.defaults ? (
                        <h1>Editace záznamu v Rejstříku metadat</h1>
                    ) : (
                        <h1>Nový záznam do Rejstříku metadat</h1>
                    )}
                    <Tooltip title={'Zobrazit / Schovat nápovědy'}>
                        <HelpOutline
                            className={styles.allHelpers}
                            onClick={() =>
                                this.setState({
                                    helpersVisible: !this.state.helpersVisible,
                                })
                            }
                        />
                    </Tooltip>
                </Paper>
                <div className={styles.body}>
                    <Paper className={styles.dataBlock}>
                        <FormControl>
                            <InputLabel id="selectTypeLabel">Type</InputLabel>
                            <Select
                                labelId="selectTypeLabel"
                                name="documentType"
                                value={this.state.documentType}
                                onChange={(e) => {
                                    this.setState({
                                        documentType: e.target.value,
                                    })
                                    this.formData.documentType = e.target.value
                                    Object.entries(
                                        typeDefinitionFile.properties
                                    ).forEach(([key, value]) => {
                                        if (value.fields === undefined) return
                                        if (value.fields[e.target.value] !== 0)
                                            return
                                        let path = value.schema
                                        if (path.includes('[%].')) {
                                            let shortPath =
                                                lodashGet(
                                                    this.formData,
                                                    path.split('[%].')[0]
                                                ) || ''
                                            for (
                                                let i = 0;
                                                i < shortPath.length;
                                                i++
                                            ) {
                                                lodashSet(
                                                    this.formData,
                                                    path.replace(
                                                        '[%].',
                                                        `[${i}].`
                                                    ),
                                                    undefined
                                                )
                                            }
                                        } else {
                                            lodashSet(
                                                this.formData,
                                                path.replace('[%]', ''),
                                                undefined
                                            )
                                        }
                                    })
                                }}
                            >
                                {typeDefinitionFile.types.map(
                                    (value, index) => {
                                        return (
                                            <MenuItem key={index} value={index}>
                                                {value}
                                            </MenuItem>
                                        )
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Paper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Název</h2>
                        {this.conditionalField('name') && (
                            <UniqueTextField
                                {...this.createFieldProps('name')}
                                uniqueSource="Metadata"
                                uniqueField="name"
                            />
                        )}
                        <Multiplier>
                            {this.conditionalField('other_names') && (
                                <TextField
                                    {...this.createFieldProps('other_names')}
                                />
                            )}
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Autor</h2>
                        {this.conditionalField('author_person') && (
                            <PersonComboBox
                                {...this.createFieldProps('author_person')}
                            />
                        )}
                        {this.conditionalField('author_corporation') && (
                            <CorporationComboBox
                                {...this.createFieldProps('author_corporation')}
                            />
                        )}
                        {this.conditionalField('author_role') && (
                            <StaticComboBox
                                {...this.createFieldProps('author_role')}
                            />
                        )}
                        <Multiplier>
                            {this.conditionalField('other_authors_person') && (
                                <PersonComboBox
                                    {...this.createFieldProps(
                                        'other_authors_person'
                                    )}
                                />
                            )}
                            {this.conditionalField(
                                'other_authors_person_role'
                            ) && (
                                <StaticComboBox
                                    {...this.createFieldProps(
                                        'other_authors_person_role'
                                    )}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField(
                                'other_authors_corporation'
                            ) && (
                                <CorporationComboBox
                                    {...this.createFieldProps(
                                        'other_authors_corporation'
                                    )}
                                />
                            )}
                            {this.conditionalField(
                                'other_authors_corporation_role'
                            ) && (
                                <StaticComboBox
                                    {...this.createFieldProps(
                                        'other_authors_corporation_role'
                                    )}
                                />
                            )}
                        </Multiplier>
                        {this.conditionalField('author_responsibility') && (
                            <TextField
                                {...this.createFieldProps(
                                    'author_responsibility'
                                )}
                            />
                        )}
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Jazyk</h2>
                        <Multiplier>
                            {this.conditionalField('language') && (
                                <StaticComboBox
                                    {...this.createFieldProps('language')}
                                />
                            )}
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Nakladatelské údaje</h2>
                        <Multiplier>
                            {this.conditionalField('publish_country') && (
                                <StaticComboBox
                                    {...this.createFieldProps(
                                        'publish_country'
                                    )}
                                />
                            )}
                            {this.conditionalField('publish_place') && (
                                <GeographicComboBox
                                    {...this.createFieldProps('publish_place')}
                                />
                            )}
                            {this.conditionalField('publisher') && (
                                <CorporationComboBox
                                    {...this.createFieldProps('publisher')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('publishing_date') && (
                                <RegExpField
                                    {...this.createFieldProps(
                                        'publishing_date'
                                    )}
                                />
                            )}
                            {this.conditionalField('publishing_date_note') && (
                                <TextField
                                    {...this.createFieldProps(
                                        'publishing_date_note'
                                    )}
                                />
                            )}
                            {this.conditionalField(
                                'publishing_date_notAccurate'
                            ) && (
                                <LabeledCheckbox
                                    {...this.createFieldProps(
                                        'publishing_date_notAccurate'
                                    )}
                                />
                            )}
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Detaily</h2>
                        <Multiplier>
                            {this.conditionalField('isbn') && (
                                <RegExpField
                                    {...this.createFieldProps('isbn')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('edition_order') && (
                                <TextField
                                    {...this.createFieldProps('edition_order')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('edition') && (
                                <TextField
                                    {...this.createFieldProps('edition')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('edition_number') && (
                                <TextField
                                    {...this.createFieldProps('edition_number')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('action_name') && (
                                <CorporationComboBox
                                    {...this.createFieldProps('action_name')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('volume_content') && (
                                <TextField
                                    {...this.createFieldProps('volume_content')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('publishing_year_from') && (
                                <TextField
                                    {...this.createFieldProps(
                                        'publishing_year_from'
                                    )}
                                />
                            )}
                            {this.conditionalField('publishing_year_to') && (
                                <TextField
                                    {...this.createFieldProps(
                                        'publishing_year_to'
                                    )}
                                />
                            )}
                            {this.conditionalField('publishing_year_note') && (
                                <TextField
                                    {...this.createFieldProps(
                                        'publishing_year_note'
                                    )}
                                />
                            )}
                            {this.conditionalField('periodicity') && (
                                <StaticComboBox
                                    {...this.createFieldProps('periodicity')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('issn') && (
                                <RegExpField
                                    {...this.createFieldProps('issn')}
                                />
                            )}
                        </Multiplier>
                        {this.conditionalField('source_document_name') && (
                            <MetadataComboBox
                                {...this.createFieldProps(
                                    'source_document_name'
                                )}
                            />
                        )}
                        {this.conditionalField('year') && (
                            <TextField {...this.createFieldProps('year')} />
                        )}
                        {this.conditionalField('volume') && (
                            <TextField {...this.createFieldProps('volume')} />
                        )}
                        {this.conditionalField('number') && (
                            <TextField {...this.createFieldProps('number')} />
                        )}
                        {this.conditionalField('date') && (
                            <DateField {...this.createFieldProps('date')} />
                        )}
                        {this.conditionalField('previous_name') && (
                            <MetadataComboBox
                                {...this.createFieldProps('previous_name')}
                            />
                        )}
                        {this.conditionalField('following_name') && (
                            <MetadataComboBox
                                {...this.createFieldProps('following_name')}
                            />
                        )}
                        <Multiplier>
                            {this.conditionalField('multiple_placement') && (
                                <CorporationComboBox
                                    {...this.createFieldProps(
                                        'multiple_placement'
                                    )}
                                />
                            )}
                            {this.conditionalField(
                                'multiple_placement_url'
                            ) && (
                                <TextField
                                    {...this.createFieldProps(
                                        'multiple_placement_url'
                                    )}
                                />
                            )}
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Umístění</h2>
                        <Multiplier>
                            {this.conditionalField('corporation_name') && (
                                <CorporationComboBox
                                    {...this.createFieldProps(
                                        'corporation_name'
                                    )}
                                />
                            )}
                            {this.conditionalField('access_conditions') && (
                                <StaticComboBox
                                    {...this.createFieldProps(
                                        'access_conditions'
                                    )}
                                />
                            )}
                            {this.conditionalField('acces_note') && (
                                <TextField
                                    {...this.createFieldProps('acces_note')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField(
                                'location_in_institution'
                            ) && (
                                <TextField
                                    {...this.createFieldProps(
                                        'location_in_institution'
                                    )}
                                />
                            )}
                            {this.conditionalField('location_in_fund') && (
                                <TextField
                                    {...this.createFieldProps(
                                        'location_in_fund'
                                    )}
                                />
                            )}
                            {this.conditionalField('location_note') && (
                                <TextField
                                    {...this.createFieldProps('location_note')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField(
                                'digitized_document_url'
                            ) && (
                                <TextField
                                    {...this.createFieldProps(
                                        'digitized_document_url'
                                    )}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('external_source_name') && (
                                <MetadataComboBox
                                    {...this.createFieldProps(
                                        'external_source_name'
                                    )}
                                />
                            )}
                            {this.conditionalField('external_source_url') && (
                                <TextField
                                    {...this.createFieldProps(
                                        'external_source_url'
                                    )}
                                />
                            )}
                            {this.conditionalField(
                                'url_leading_to_document'
                            ) && (
                                <TextField
                                    {...this.createFieldProps(
                                        'url_leading_to_document'
                                    )}
                                />
                            )}
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Fyzický popis</h2>
                        <Multiplier>
                            {this.conditionalField('form') && (
                                <FormStaticComboBox
                                    {...this.createFieldProps('form')}
                                />
                            )}
                        </Multiplier>
                        {this.conditionalField('range') && (
                            <TextField {...this.createFieldProps('range')} />
                        )}
                        {this.conditionalField('dimension') && (
                            <TextField
                                {...this.createFieldProps('dimension')}
                            />
                        )}
                        <Multiplier>
                            {this.conditionalField('map_scale') && (
                                <TextField
                                    {...this.createFieldProps('map_scale')}
                                />
                            )}
                        </Multiplier>
                        {this.conditionalField('format') && (
                            <TextField {...this.createFieldProps('format')} />
                        )}
                        {this.conditionalField('processing_level') && (
                            <StaticComboBox
                                {...this.createFieldProps('processing_level')}
                            />
                        )}
                        {this.conditionalField('description_level') && (
                            <StaticComboBox
                                {...this.createFieldProps('description_level')}
                            />
                        )}
                        <Multiplier>
                            {this.conditionalField('archival_aids') && (
                                <MetadataComboBox
                                    {...this.createFieldProps('archival_aids')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('source_citation') && (
                                <MetadataComboBox
                                    {...this.createFieldProps(
                                        'source_citation'
                                    )}
                                />
                            )}
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Obsahová charakteristika</h2>
                        <Multiplier>
                            {this.conditionalField(
                                'described_object_citation'
                            ) && (
                                <MetadataComboBox
                                    {...this.createFieldProps(
                                        'described_object_citation'
                                    )}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('topic_person') && (
                                <PersonComboBox
                                    {...this.createFieldProps('topic_person')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('topic_corporation') && (
                                <CorporationComboBox
                                    {...this.createFieldProps(
                                        'topic_corporation'
                                    )}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('topic_place') && (
                                <GeographicComboBox
                                    {...this.createFieldProps('topic_place')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('topic_event') && (
                                <SubjectComboBox
                                    {...this.createFieldProps('topic_event')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('topic_creation') && (
                                <CreationComboBox
                                    {...this.createFieldProps('topic_creation')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('topic_keyword') && (
                                <KeywordComboBox
                                    {...this.createFieldProps('topic_keyword')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('topic_family') && (
                                <FamilyComboBox
                                    {...this.createFieldProps('topic_family')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField(
                                'corporation_content_specification_person'
                            ) && (
                                <PersonComboBox
                                    {...this.createFieldProps(
                                        'corporation_content_specification_person'
                                    )}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField(
                                'corporation_content_specification_corporation'
                            ) && (
                                <CorporationComboBox
                                    {...this.createFieldProps(
                                        'corporation_content_specification_corporation'
                                    )}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField(
                                'chronological_content_specification_begin'
                            ) && (
                                <TextField
                                    {...this.createFieldProps(
                                        'chronological_content_specification_begin'
                                    )}
                                />
                            )}
                            {this.conditionalField(
                                'chronological_content_specification_end'
                            ) && (
                                <TextField
                                    {...this.createFieldProps(
                                        'chronological_content_specification_end'
                                    )}
                                />
                            )}
                            {this.conditionalField(
                                'chronological_content_specification_active'
                            ) && (
                                <LabeledCheckbox
                                    {...this.createFieldProps(
                                        'chronological_content_specification_active'
                                    )}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField(
                                'geographical_content_specification'
                            ) && (
                                <GeographicComboBox
                                    {...this.createFieldProps(
                                        'geographical_content_specification'
                                    )}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('keywords') && (
                                <KeywordComboBox
                                    {...this.createFieldProps('keywords')}
                                />
                            )}
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Popis</h2>
                        <Multiplier>
                            {this.conditionalField('description') && (
                                <TextField
                                    {...this.createFieldProps('description')}
                                />
                            )}
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Poznámky</h2>
                        <Multiplier>
                            {this.conditionalField('general_note') && (
                                <TextField
                                    {...this.createFieldProps('general_note')}
                                />
                            )}
                        </Multiplier>
                        <Multiplier>
                            {this.conditionalField('editor_note') && (
                                <TextField
                                    {...this.createFieldProps('editor_note')}
                                />
                            )}
                        </Multiplier>
                        {this.conditionalField('submitter') && (
                            <TextField
                                {...this.createFieldProps('submitter')}
                                label={'Zadavatelův email'}
                            />
                        )}
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Přílohy</h2>
                        <Multiplier>
                            <UploadFile
                                {...this.createFieldProps('attachment_url')}
                            />
                            <TextField
                                {...this.createFieldProps(
                                    'attachment_description'
                                )}
                            />
                        </Multiplier>
                    </FoldablePaper>
                </div>
                <Button
                    className={styles.footer}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={this.send}
                >
                    Nahrát
                </Button>
            </form>
        )
    }
}

export default withSnackbar(withRouter(Metadata))
