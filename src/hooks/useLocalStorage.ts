export default function useLocalStorage() {
  function getWatched() {
    if (typeof window !== 'undefined') {
      let watched = localStorage.getItem('watched');
      if (watched !== null) {
        let result = JSON.parse(watched);
        return result.watched;
      }
      return null;
    }
    return null;
  }
  function getWatchedId(id: string) {
    if (typeof window !== 'undefined') {
      let watched = localStorage.getItem('watched');
      if (watched !== null) {
        let result = JSON.parse(watched);
        return result.watched[id];
      }
      return null;
    }
    return null;
  }
  function setWatchedId({
    anislistId,
    title,
    image,
    sourceId,
    chapterId,
  }: any) {
    if (typeof window !== 'undefined') {
      let watched = localStorage.getItem('watched');
      if (watched) {
        let result = JSON.parse(watched);
        if (result.watched[anislistId]) {
          let toSave: any = result.watched[anislistId];
          if (!(toSave.chapterId === chapterId)) {
            toSave.chapterId = chapterId;
            result.watched[anislistId] = toSave;
            localStorage.setItem('watched', JSON.stringify(result));
          }
        } else {
          let toSave: any = {
            anislistId,
            title,
            image,
            sourceId,
            chapterId,
          };
          result.watched[anislistId] = toSave;

          localStorage.setItem('watched', JSON.stringify(result));
        }
      } else {
        let info: any = {
          anislistId,
          title,
          image,
          sourceId,
          chapterId,
        };
        let toSave = {
          watched: {
            [anislistId]: info,
          },
        };

        localStorage.setItem('watched', JSON.stringify(toSave));
      }
    }
  }
  function delWatched(id: string) {
    let watched = getWatched();
    delete watched[id];
    localStorage.setItem('watched', JSON.stringify({ watched }));
  }

  return {
    getWatched,
    getWatchedId,
    setWatchedId,
    delWatched,
  };
}
