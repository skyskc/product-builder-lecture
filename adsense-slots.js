window.GOSEOUL_ADSENSE_SLOTS = window.GOSEOUL_ADSENSE_SLOTS || {
  home_candidate_a: "",
  explore_candidate_b: "",
  course_candidate_b: "",
  kcontent_result_candidate_a: ""
};

window.GOSEOUL_ADSENSE_SETTINGS = window.GOSEOUL_ADSENSE_SETTINGS || {
  adTest: false,
  rollout: {
    mode: "page_ab",
    experimentKey: "goseoul_ads_rollout_v1",
    // Start with Explore only (`explore.html` uses `data-page="home"`).
    // "control" hides the slot, "test" enables it.
    page: "home",
    slotKey: "explore_candidate_b",
    ratio: 0.5
  }
};
