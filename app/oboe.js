const notes = {
  sh: -1,
  si: 0, do: 1, re: 3, mi: 5, fa: 6, sol: 8, la: 10, si2: 12, do2: 13, re2: 15, mi2: 17,
  do_s: 2, re_s: 4, fa_s: 7, sol_s: 9, la_s: 11, do2_s: 14, re2_s: 16
}

var Oboe = {
  hz: 100, tempo: 4, note: 4,
  notes: [
    { note: notes.sh, time: 5000  },
    { note: notes.mi, time: 2000  },
    { note: notes.re, time: 2000  },
    { note: notes.do, time: 1000  },
    { note: notes.re, time: 500   },
    { note: notes.mi, time: 500   },
    { note: notes.fa, time: 1000  },
    { note: notes.re, time: 500   },
    { note: notes.do, time: 500   },
    { note: notes.si, time: 1500  },
    { note: notes.do, time: 1000  },
    { note: notes.re, time: 500   },
    { note: notes.mi, time: 500   },
    { note: notes.fa, time: 1000  },
    { note: notes.mi, time: 500   },
    { note: notes.fa, time: 1000  },
    { note: notes.re, time: 500   },
    { note: notes.do, time: 500   },
    { note: notes.si, time: 1500  }
  ]
}
