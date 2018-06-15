import GeoJSON from 'geojson'

export const toGeoJSON = json =>
  GeoJSON.parse(json, {
    Point: ['latitude', 'longitude'],
    exclude: ['legacyId', 'address']
  })

export const goalsToArray = json => {
  const result = json
  if (result.properties.goals) {
    result.properties.goals = result.properties.goals.map(({ name }) => name)
  }
  return result
}
