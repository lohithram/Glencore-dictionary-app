import React from 'react';

interface DictionaryRowProps {
    name: string,
    isApplied?: boolean,
    handleApplyClick?: () => void,
    handleEditClick?: () => void,
}

export default class DictionaryRow extends React.PureComponent<DictionaryRowProps>{

  render() {
    const {name, handleApplyClick, handleEditClick} = this.props;
    return (
          <tr>
            <td>{name}</td>
            <td>
              <button className="btn btn-secondary btn-sm"
                onClick={handleEditClick}>View</button>
            </td>
            <td>
              {this.props.isApplied ?
                "Applied" :
                <button className="btn btn-secondary btn-sm"
                        onClick={handleApplyClick}>
                        Apply
                </button>}
            </td>
          </tr>
    )
  }
}
