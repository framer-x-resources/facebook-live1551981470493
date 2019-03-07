import * as React from 'react'
import { PropertyControls, ControlType } from 'framer'

// Define type of property
interface Props {
  currentIndex: string
  debug: boolean
}

export class IndexFrame extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    currentIndex: 0,
    width: 5,
    height: 5,
    debug: true,
  }

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    currentIndex: { type: ControlType.Number, title: 'Current Index' },
    debug: { type: ControlType.Boolean, title: 'Debug' },
  }

  render() {
    return (
      <div
        style={{
          background: this.props.debug ? 'red' : 'transparent',
          width: '100%',
          height: '100%',
        }}
      />
    )
  }
}
