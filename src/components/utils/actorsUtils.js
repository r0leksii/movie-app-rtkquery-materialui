export const mapActorDataToNames = (actorsData) => {
  if (!actorsData || !actorsData.cast) return []

  const actorNames = actorsData.cast.map((actor) => ({
    name: actor.name,
    profile_path: actor.profile_path,
  }))

  return actorNames.slice(0, 10)
}
