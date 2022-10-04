import React from 'react'
import { Paper, IconButton } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import CropSquareIcon from '@material-ui/icons/CropSquare'

/**
 * Paper block that can fold and unfold
 */
class FoldablePaper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            folded: false,
        }
    }

    fold = () => this.setState({ folded: !this.state.folded })

    render() {
        return (
            <Paper
                {...this.props}
                style={{
                    position: 'relative',
                    overflowY: 'hidden',
                    transform: 'translateZ(0)',
                    maxHeight: this.state.folded ? '100px' : 'none',
                }}
            >
                <IconButton
                    style={{
                        position: 'absolute',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        right: '5px',
                    }}
                    onClick={this.fold}
                >
                    {this.state.folded ? <CropSquareIcon /> : <RemoveIcon />}
                </IconButton>
                {this.props.children}
            </Paper>
        )
    }
}

export default FoldablePaper
