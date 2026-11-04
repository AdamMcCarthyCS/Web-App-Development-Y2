export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    },
    lisa: {
      firstName: "Lisa",
      lastName: "Simpson",
      email: "lisa@simpson.com",
      password: "secret"
    },
    maggie: {
      firstName: "Maggie",
      lastName: "Simpson",
      email: "maggie@simpson.com",
      password: "secret"
    },
    ned: {
      firstName: "Ned",
      lastName: "Flanders",
      email: "ned@flanders.com",
      password: "secret"
    },
    milhouse: {
      firstName: "Milhouse",
      lastName: "Van Houten",
      email: "milhouse@vanhouten.com",
      password: "secret"
    }
  },
  playlists: {
    _model: "Playlist",
    mozart: {
      title: "Mozart Favourites",
      userid: "->users.bart"
    },
    rock: {
      title: "Classic Rock",
      userid: "->users.homer"
    },
    mellow: {
      title: "Mellow Moments",
      userid: "->users.marge"
    },
    study: {
      title: "Lisa's Study Mix",
      userid: "->users.lisa"
    },
    sunday: {
      title: "Sunday Hymns",
      userid: "->users.ned"
    },
    favourites: {
      title: "Milhouse's Favourites",
      userid: "->users.milhouse"
    }
  },
  tracks: {
    _model: "Track",
    track_1: {
      title: "Violin Concerto No. 1",
      artist: "Mozart",
      duration: 15,
      playlistid: "->playlists.mozart"
    },
    track_2: {
      title: "Eine kleine Nachtmusik",
      artist: "Mozart",
      duration: 6,
      playlistid: "->playlists.mozart"
    },
    track_3: {
      title: "Piano Concerto No. 21",
      artist: "Mozart",
      duration: 29,
      playlistid: "->playlists.mozart"
    },
    track_4: {
      title: "Symphony No. 40",
      artist: "Mozart",
      duration: 33,
      playlistid: "->playlists.mozart"
    },
    track_5: {
      title: "Dream On",
      artist: "Aerosmith",
      duration: 5,
      playlistid: "->playlists.rock"
    },
    track_6: {
      title: "Hotel California",
      artist: "Eagles",
      duration: 6,
      playlistid: "->playlists.rock"
    },
    track_7: {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      duration: 6,
      playlistid: "->playlists.rock"
    },
    track_8: {
      title: "Go Your Own Way",
      artist: "Fleetwood Mac",
      duration: 4,
      playlistid: "->playlists.rock"
    },
    track_9: {
      title: "Dreams",
      artist: "Fleetwood Mac",
      duration: 5,
      playlistid: "->playlists.mellow"
    },
    track_10: {
      title: "Fields of Gold",
      artist: "Sting",
      duration: 4,
      playlistid: "->playlists.mellow"
    },
    track_11: {
      title: "Fast Car",
      artist: "Tracy Chapman",
      duration: 5,
      playlistid: "->playlists.mellow"
    },
    track_12: {
      title: "Clair de Lune",
      artist: "Claude Debussy",
      duration: 5,
      playlistid: "->playlists.study"
    },
    track_13: {
      title: "The Four Seasons: Spring",
      artist: "Antonio Vivaldi",
      duration: 11,
      playlistid: "->playlists.study"
    },
    track_14: {
      title: "Gymnopédie No. 1",
      artist: "Erik Satie",
      duration: 4,
      playlistid: "->playlists.study"
    },
    track_15: {
      title: "Amazing Grace",
      artist: "Traditional",
      duration: 4,
      playlistid: "->playlists.sunday"
    },
    track_16: {
      title: "Be Thou My Vision",
      artist: "Traditional",
      duration: 3,
      playlistid: "->playlists.sunday"
    },
    track_17: {
      title: "How Great Thou Art",
      artist: "Carl Boberg",
      duration: 5,
      playlistid: "->playlists.sunday"
    },
    track_18: {
      title: "Take On Me",
      artist: "a-ha",
      duration: 4,
      playlistid: "->playlists.favourites"
    },
    track_19: {
      title: "Africa",
      artist: "Toto",
      duration: 5,
      playlistid: "->playlists.favourites"
    },
    track_20: {
      title: "Never Gonna Give You Up",
      artist: "Rick Astley",
      duration: 4,
      playlistid: "->playlists.favourites"
    }
  }
};