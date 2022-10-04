import React from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { TextField, Button, Paper, Tooltip } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'

import {
    CorporationComboBox,
    CreationComboBox,
    GeographicComboBox,
    KeywordComboBox,
    PersonComboBox,
    SubjectComboBox,
    SubmitterComboBox,
    StaticComboBox,
} from '../comboBoxes'
import IndexParent from './indexParent'
import GPSField from '../validationTextFields/GPSField'
import styles from './parent.module.scss'
import typeDefinitionFile from './geographicTypes.json'
import Multiplier from '../Multiplier'
import MetadataComboBox from 'components/comboBoxes/MetadataComboBox'
import FoldablePaper from '../../components/FoldablePaper'
import UniqueTextField from '../../components/UniqueTextField'
import UploadFile from '../../components/UploadFile'

class Geographic extends IndexParent {
    constructor(props) {
        super(props)

        this.state = {
            helpersVisible: false,
        }

        this.indexURL = 'geographic'
    }

    getTypeDefinition = (fieldName) => typeDefinitionFile.properties[fieldName]

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
                        <h1>Editace záznamu v Geografického rejstříku</h1>
                    ) : (
                        <h1>Nový záznam do Geografického rejstříku</h1>
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
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Preferované označení</h2>
                        <UniqueTextField
                            {...this.createFieldProps('name_main_part')}
                            uniqueSource="GeographicIndex"
                            uniqueField="name_main_part"
                        />
                        <Multiplier>
                            <TextField
                                {...this.createFieldProps('name_other_part')}
                            />
                        </Multiplier>
                        <KeywordComboBox
                            {...this.createFieldProps('general_complement')}
                        />
                        <GeographicComboBox
                            {...this.createFieldProps(
                                'geographical_complement'
                            )}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'chronological_complement'
                            )}
                        />
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Variantní označení</h2>
                        <Multiplier>
                            <StaticComboBox
                                {...this.createFieldProps('variant_type')}
                            />
                            <TextField
                                {...this.createFieldProps('variant_value')}
                            />
                            <KeywordComboBox
                                {...this.createFieldProps(
                                    'variant_general_complement'
                                )}
                            />
                            <GeographicComboBox
                                {...this.createFieldProps(
                                    'variant_geographical_complement'
                                )}
                            />
                            <TextField
                                {...this.createFieldProps(
                                    'variant_chronological_complement'
                                )}
                            />
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Změna doplňků</h2>
                        <Multiplier>
                            <StaticComboBox
                                {...this.createFieldProps(
                                    'complement_change_type'
                                )}
                            />
                            <TextField
                                {...this.createFieldProps(
                                    'complement_change_value'
                                )}
                            />
                            <KeywordComboBox
                                {...this.createFieldProps(
                                    'complement_change_general_complement'
                                )}
                            />
                            <GeographicComboBox
                                {...this.createFieldProps(
                                    'complement_change_geographical_complement'
                                )}
                            />
                            <TextField
                                {...this.createFieldProps(
                                    'complement_change_chronological_complement'
                                )}
                            />
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Popis</h2>
                        <TextField
                            {...this.createFieldProps('brief_characteristic')}
                        />
                        <TextField {...this.createFieldProps('description')} />
                        <TextField {...this.createFieldProps('history')} />
                        <TextField
                            {...this.createFieldProps('electronical_location')}
                        />
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Souřadnice</h2>
                        <Multiplier>
                            <GPSField
                                {...this.createFieldProps('coordinates')}
                            />
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Vztahy</h2>
                        <Multiplier>
                            <GeographicComboBox
                                {...this.createFieldProps('partner_object')}
                            />
                        </Multiplier>
                        <Multiplier>
                            <PersonComboBox
                                {...this.createFieldProps('owner')}
                            />
                        </Multiplier>
                        <h2>Zahrnuta v korporaci</h2>
                        <Multiplier>
                            <CorporationComboBox
                                {...this.createFieldProps('corporation_name')}
                            />
                            <PersonComboBox
                                {...this.createFieldProps('corporation_owner')}
                            />
                        </Multiplier>
                        <h2>Pojmenováno po</h2>
                        <Multiplier>
                            <PersonComboBox
                                {...this.createFieldProps('related_person')}
                            />
                        </Multiplier>
                        <Multiplier>
                            <CreationComboBox
                                {...this.createFieldProps('related_creation')}
                            />
                        </Multiplier>
                        <Multiplier>
                            <SubjectComboBox
                                {...this.createFieldProps('related_event')}
                            />
                        </Multiplier>
                        <Multiplier>
                            <CorporationComboBox
                                {...this.createFieldProps(
                                    'related_corporation'
                                )}
                            />
                        </Multiplier>
                        <Multiplier>
                            <GeographicComboBox
                                {...this.createFieldProps('superordinate')}
                            />
                        </Multiplier>
                        <Multiplier>
                            <GeographicComboBox
                                {...this.createFieldProps('subordinate')}
                            />
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Počátek existence</h2>
                        <PersonComboBox
                            {...this.createFieldProps('founding_person')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'founding_person_chrono_spec'
                            )}
                        />
                        <CorporationComboBox
                            {...this.createFieldProps('founding_corporation')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'founding_corporation_chrono_spec'
                            )}
                        />
                        <TextField
                            {...this.createFieldProps('founding_document')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'founding_document_chrono_spec'
                            )}
                        />
                        <GeographicComboBox
                            {...this.createFieldProps('founding_place')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'founding_place_chrono_spec'
                            )}
                        />
                        <SubjectComboBox
                            {...this.createFieldProps('founding_event')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'founding_event_chrono_spec'
                            )}
                        />
                        <TextField
                            {...this.createFieldProps('first_mention_document')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'first_mention_document_chrono_spec'
                            )}
                        />
                        <GeographicComboBox
                            {...this.createFieldProps('first_mention_place')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'first_mention_place_chrono_spec'
                            )}
                        />
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Konec existence</h2>
                        <PersonComboBox
                            {...this.createFieldProps('cancellation_person')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'cancellation_person_chrono_spec'
                            )}
                        />
                        <CorporationComboBox
                            {...this.createFieldProps(
                                'cancellation_corporation'
                            )}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'cancellation_corporation_chrono_spec'
                            )}
                        />
                        <TextField
                            {...this.createFieldProps('cancellation_document')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'cancellation_document_chrono_spec'
                            )}
                        />
                        <GeographicComboBox
                            {...this.createFieldProps('cancellation_place')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'cancellation_place_chrono_spec'
                            )}
                        />
                        <SubjectComboBox
                            {...this.createFieldProps('last_mention_event')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'last_mention_event_chrono_spec'
                            )}
                        />
                        <TextField
                            {...this.createFieldProps('last_mention_document')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'last_mention_document_chrono_spec'
                            )}
                        />
                        <GeographicComboBox
                            {...this.createFieldProps('last_mention_place')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'last_mention_place_chrono_spec'
                            )}
                        />
                        <GeographicComboBox
                            {...this.createFieldProps('owner_change')}
                        />
                        <TextField
                            {...this.createFieldProps(
                                'owner_change_chrono_spec'
                            )}
                        />
                        <Multiplier>
                            <TextField
                                {...this.createFieldProps(
                                    'historical_milestones'
                                )}
                            />
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Hierarchie</h2>
                        <GeographicComboBox
                            {...this.createFieldProps('country')}
                        />
                        <GeographicComboBox
                            {...this.createFieldProps('region')}
                        />
                        <GeographicComboBox
                            {...this.createFieldProps('district')}
                        />
                        <GeographicComboBox
                            {...this.createFieldProps('municipality')}
                        />
                        <GeographicComboBox
                            {...this.createFieldProps('municipality_part')}
                        />
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Zařazení</h2>
                        <Multiplier>
                            <KeywordComboBox
                                {...this.createFieldProps('category')}
                            />
                        </Multiplier>
                        <Multiplier>
                            <KeywordComboBox
                                {...this.createFieldProps('characteristic')}
                            />
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Vyobrazení</h2>
                        <Multiplier>
                            <MetadataComboBox
                                {...this.createFieldProps('logo')}
                            />
                        </Multiplier>
                        <Multiplier>
                            <MetadataComboBox
                                {...this.createFieldProps('mark')}
                            />
                        </Multiplier>
                        <Multiplier>
                            <MetadataComboBox
                                {...this.createFieldProps('flag')}
                            />
                        </Multiplier>
                        <Multiplier>
                            <MetadataComboBox
                                {...this.createFieldProps('arm')}
                            />
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Poznámky</h2>
                        <Multiplier>
                            <TextField
                                {...this.createFieldProps('public_note')}
                            />
                        </Multiplier>
                        <Multiplier>
                            <TextField
                                {...this.createFieldProps('nonpublic_note')}
                            />
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Jiný zdroj</h2>
                        <Multiplier>
                            <TextField
                                {...this.createFieldProps('other_source_name')}
                            />
                            <TextField
                                {...this.createFieldProps('other_source_id')}
                            />
                            <TextField
                                {...this.createFieldProps(
                                    'other_source_identificator'
                                )}
                            />
                        </Multiplier>
                    </FoldablePaper>
                    <FoldablePaper className={styles.dataBlock}>
                        {' '}
                        <h2>Zdroje o heslu</h2>
                        <Multiplier>
                            <TextField
                                {...this.createFieldProps('record_sources')}
                            />
                        </Multiplier>
                        <Multiplier>
                            <TextField
                                {...this.createFieldProps('editor_note')}
                            />
                        </Multiplier>
                        <SubmitterComboBox
                            {...this.createFieldProps('submitter')}
                        />
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

export default withSnackbar(withRouter(Geographic))
