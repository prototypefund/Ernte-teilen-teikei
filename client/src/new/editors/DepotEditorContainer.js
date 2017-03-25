import { connect } from 'react-redux'
import { createDepot } from './editorActions'
import DepotEditor from './DepotEditor'

const extractFarmOptions = places => places.filter(p => p.type === 'Farm')
const mapStateToProps = ({ editor, map }) => {
  const initialValues = editor.currentPlace && {
    geocoder: {
      city: editor.currentPlace.city,
      address: editor.currentPlace.address,
      latitude: Number(editor.currentPlace.latitude),
      longitude: Number(editor.currentPlace.longitude),
    },
    ...editor.currentPlace,
  }

  return ({
    initialValues,
    editor,
    farms: extractFarmOptions(map.places),
  })
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: payload => dispatch(createDepot(payload)),
})

const DepotEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepotEditor)

export default DepotEditorContainer
