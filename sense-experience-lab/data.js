const FALLBACK_PUBLIC_ORIGIN = "http://192.168.100.154:8080";

const modelParams = "?autostart=0&ui_infos=0&ui_theme=dark&ui_controls=1&ui_hint=0";

const senses = {
  vision: {
    sense: "Vision",
    organ: "Eye",
    stationTitle: "Vision Station",
    gateway: "Eye",
    layers: [
      ["First look", "Whole eyeball and optic nerve"],
      ["Layer 1", "Cornea, iris, pupil, lens"],
      ["Layer 2", "Retina and fovea centralis"],
      ["Layer 3", "Rods, cones, and optic nerve signal"]
    ],
    model:
      "https://sketchfab.com/models/f7745aaff145485fb02cf729c96c5f37/embed" + modelParams,
    source: "https://anatomytool.org/content/groningen-3d-model-anatomy-eye",
    summary:
      "Light enters the eye, is focused onto the retina, and becomes nerve signals that the brain interprets as sight.",
    input: "Light",
    receptor: "Photoreceptors",
    nerve: "Optic nerve",
    processor: "Visual cortex",
    engineer:
      "Engineering analogy: lens system + image sensor + data cable + image processor.",
    interactionTitle: "Change the visual condition",
    interactionIntro:
      "Compare how focus and cone function affect what information the eye can send to the brain.",
    terms: [
      ["Cornea", "Transparent anterior surface that refracts incoming light."],
      ["Lens", "Biconvex structure that fine-focuses light onto the retina."],
      ["Retina", "Neural layer containing rods and cones."],
      ["Fovea centralis", "Region of highest visual acuity."],
      ["Nervus opticus", "Optic nerve carrying visual signals to the brain."]
    ],
    quiz: [
      {
        q: "Which structure contains rods and cones?",
        a: ["Cornea", "Retina", "Cochlea", "Tongue"],
        correct: 1
      },
      {
        q: "Myopia usually means distant objects are blurry because light focuses:",
        a: ["Behind the retina", "Before the retina", "In the cochlea", "In the olfactory bulb"],
        correct: 1
      },
      {
        q: "Which structure fine-focuses light?",
        a: ["Lens", "Eardrum", "Taste bud", "Semicircular canal"],
        correct: 0
      },
      {
        q: "Cone cells are especially important for:",
        a: ["Balance", "Color vision", "Smell", "Sound amplification"],
        correct: 1
      },
      {
        q: "The optic nerve carries signals from the retina to the:",
        a: ["Brain", "Tongue", "Middle ear", "Nasal cavity"],
        correct: 0
      }
    ]
  },
  hearing: {
    sense: "Hearing",
    organ: "Cochlea",
    stationTitle: "Hearing Station",
    gateway: "Ear and Cochlea",
    layers: [
      ["First look", "Outer, middle, and inner ear"],
      ["Layer 1", "Tympanic membrane and ossicles"],
      ["Layer 2", "Cochlea and vestibulocochlear nerve"],
      ["Layer 3", "Organ of Corti and hair cells"]
    ],
    model:
      "https://sketchfab.com/models/c3e65826b8ac48f9ba472d5a384813ad/embed" + modelParams,
    source: "https://sketchfab.com/models/c3e65826b8ac48f9ba472d5a384813ad/embed",
    summary:
      "Sound vibration moves through the ear and is converted by cochlear hair cells into nerve signals.",
    input: "Sound vibration",
    receptor: "Cochlear hair cells",
    nerve: "Nervus cochlearis",
    processor: "Auditory cortex",
    engineer:
      "Engineering analogy: microphone + amplifier + frequency analyzer + signal cable.",
    interactionTitle: "Hear frequency changes",
    interactionIntro:
      "Low-volume tones show why losing high-frequency detail can make speech harder to understand.",
    terms: [
      ["Cochlea", "Spiral inner-ear organ that analyzes sound frequency."],
      ["Organum spirale", "Organ of Corti containing mechanosensory hair cells."],
      ["Scala vestibuli", "Upper fluid chamber of the cochlea."],
      ["Scala media", "Middle cochlear duct containing endolymph."],
      ["Nervus cochlearis", "Cochlear nerve carrying hearing signals."]
    ],
    quiz: [
      {
        q: "Which cells convert cochlear vibration into nerve signals?",
        a: ["Hair cells", "Cone cells", "Olfactory receptors", "Taste pores"],
        correct: 0
      },
      {
        q: "High-frequency hearing loss often makes speech:",
        a: ["Clearer", "Less clear", "Brighter in color", "Sweeter"],
        correct: 1
      },
      {
        q: "The cochlea is located in the:",
        a: ["Inner ear", "Retina", "Tongue", "Nasal septum"],
        correct: 0
      },
      {
        q: "Which structure amplifies vibration before it reaches the inner ear?",
        a: ["Ossicles", "Iris", "Papillae", "Olfactory bulb"],
        correct: 0
      },
      {
        q: "A good hearing-protection habit is:",
        a: ["Maximum headphone volume", "Ear protection around loud noise", "Looking at the sun", "Sniffing unknown chemicals"],
        correct: 1
      }
    ]
  },
  balance: {
    sense: "Balance",
    organ: "Vestibular organ",
    stationTitle: "Balance Station",
    gateway: "Vestibular Organ",
    layers: [
      ["First look", "Inner ear balance labyrinth"],
      ["Layer 1", "Three semicircular canals"],
      ["Layer 2", "Utricle and saccule"],
      ["Layer 3", "Ampullae, hair cells, and vestibular nerve"]
    ],
    model:
      "https://sketchfab.com/models/67db1adcb5ac4b20a4ff6eebf975e3b0/embed" + modelParams,
    source:
      "https://sketchfab.com/3d-models/2023-inner-ear-bones-67db1adcb5ac4b20a4ff6eebf975e3b0",
    summary:
      "The vestibular organ detects head rotation, tilt, and acceleration so the brain can orient the body.",
    input: "Head motion",
    receptor: "Vestibular hair cells",
    nerve: "Nervus vestibularis",
    processor: "Brainstem and cerebellum",
    engineer:
      "Engineering analogy: gyroscope + accelerometer + sensor-fusion processor.",
    interactionTitle: "Create a gentle sensory mismatch",
    interactionIntro:
      "A moving visual scene while your body is still helps explain visual-vestibular conflict.",
    terms: [
      ["Canalis semicircularis anterior", "Anterior semicircular canal detecting angular motion."],
      ["Canalis semicircularis posterior", "Posterior semicircular canal detecting head rotation."],
      ["Canalis semicircularis lateralis", "Lateral semicircular canal detecting horizontal rotation."],
      ["Utriculus", "Utricle detecting tilt and linear acceleration."],
      ["Sacculus", "Saccule detecting vertical acceleration."]
    ],
    quiz: [
      {
        q: "Semicircular canals mainly detect:",
        a: ["Head rotation", "Color", "Sweetness", "Odor molecules"],
        correct: 0
      },
      {
        q: "The utricle and saccule help detect:",
        a: ["Tilt and linear acceleration", "High notes only", "Red light only", "Bitter chemicals only"],
        correct: 0
      },
      {
        q: "Motion sickness often happens when signals from eyes and inner ear:",
        a: ["Match perfectly", "Conflict", "Stop existing", "Become taste signals"],
        correct: 1
      },
      {
        q: "The vestibular organ is located in the:",
        a: ["Inner ear", "Cornea", "Tongue tip", "Olfactory epithelium"],
        correct: 0
      },
      {
        q: "A helpful motion-sickness strategy for many people is:",
        a: ["Look at the horizon", "Spin faster", "Read a phone continuously", "Turn sound louder"],
        correct: 0
      }
    ]
  },
  smell: {
    sense: "Smell",
    organ: "Olfactory epithelium",
    stationTitle: "Smell Station",
    gateway: "Olfactory Epithelium",
    layers: [
      ["First look", "Nasal cavity and upper nose"],
      ["Layer 1", "Superior nasal concha"],
      ["Layer 2", "Olfactory epithelium"],
      ["Layer 3", "Olfactory receptor neurons and bulb"]
    ],
    model:
      "https://sketchfab.com/models/9be710c2357b4705a744f9be6052f139/embed" + modelParams,
    source: "https://sketchfab.com/models/9be710c2357b4705a744f9be6052f139/embed",
    summary:
      "Odor molecules bind to olfactory receptors, creating activity patterns that the brain recognizes as smell.",
    input: "Odor molecules",
    receptor: "Olfactory receptor neurons",
    nerve: "Nervus olfactorius",
    processor: "Olfactory bulb and cortex",
    engineer:
      "Engineering analogy: chemical detector array + pattern-recognition system.",
    interactionTitle: "Build an odor receptor pattern",
    interactionIntro:
      "Different odor molecules activate different receptor combinations, like a chemical barcode.",
    terms: [
      ["Regio olfactoria", "Olfactory region in the superior nasal cavity."],
      ["Epithelium olfactorium", "Olfactory epithelium containing sensory receptor neurons."],
      ["Fila olfactoria", "Small olfactory nerve fibers passing through the cribriform plate."],
      ["Bulbus olfactorius", "Olfactory bulb that begins organizing smell signals."],
      ["Concha nasalis superior", "Superior nasal concha near the olfactory region."]
    ],
    quiz: [
      {
        q: "Smell begins when odor molecules reach the:",
        a: ["Olfactory epithelium", "Retina", "Cochlea", "Taste pore"],
        correct: 0
      },
      {
        q: "The olfactory bulb helps:",
        a: ["Organize smell signals", "Focus light", "Amplify sound", "Detect head rotation"],
        correct: 0
      },
      {
        q: "Smell identity depends strongly on:",
        a: ["Receptor patterns", "Lens shape only", "Eardrum thickness only", "Tongue temperature only"],
        correct: 0
      },
      {
        q: "A smell-protection habit is:",
        a: ["Avoid sniffing unknown chemicals", "Listen louder", "Spin faster", "Look at lasers"],
        correct: 0
      },
      {
        q: "The olfactory nerve is also called:",
        a: ["Cranial nerve I", "Cranial nerve VIII", "Optic nerve", "Vestibular nerve"],
        correct: 0
      }
    ]
  },
  taste: {
    sense: "Taste",
    organ: "Taste buds",
    stationTitle: "Taste Station",
    gateway: "Taste Buds",
    layers: [
      ["First look", "Tongue surface"],
      ["Layer 1", "Papillae on the tongue"],
      ["Layer 2", "Taste buds inside papillae"],
      ["Layer 3", "Taste pore and receptor cells"]
    ],
    model:
      "https://sketchfab.com/models/834e2dc8725d486f9f875a552d67ddd7/embed" + modelParams,
    source:
      "https://sketchfab.com/3d-models/tongue-anatomy-834e2dc8725d486f9f875a552d67ddd7",
    summary:
      "Taste buds detect dissolved chemicals and send basic taste signals to the brain.",
    input: "Dissolved chemicals",
    receptor: "Taste receptor cells",
    nerve: "Facial, glossopharyngeal, and vagus nerves",
    processor: "Gustatory cortex",
    engineer:
      "Engineering analogy: liquid chemical sensor + signal classifier.",
    interactionTitle: "Activate taste receptor cells",
    interactionIntro:
      "Select a taste quality and adjust concentration to see how signal strength changes.",
    terms: [
      ["Caliculus gustatorius", "Taste bud containing taste receptor cells."],
      ["Porus gustatorius", "Taste pore where dissolved chemicals enter."],
      ["Papillae fungiformes", "Fungiform papillae often found near the anterior tongue."],
      ["Papillae vallatae", "Large circumvallate papillae near the posterior tongue."],
      ["Nervus glossopharyngeus", "Cranial nerve IX carrying taste from the posterior tongue."]
    ],
    quiz: [
      {
        q: "Taste buds detect chemicals that are:",
        a: ["Dissolved in saliva", "Only visible as color", "Only loud", "Only moving"],
        correct: 0
      },
      {
        q: "A taste pore is the opening where:",
        a: ["Dissolved chemicals enter", "Light enters the eye", "Sound leaves the cochlea", "Head rotation begins"],
        correct: 0
      },
      {
        q: "Which is a basic taste quality?",
        a: ["Umami", "Purple", "Rotation", "High-frequency"],
        correct: 0
      },
      {
        q: "Taste is different from flavor because flavor also uses:",
        a: ["Smell and texture", "Only the lens", "Only the eardrum", "Only the semicircular canals"],
        correct: 0
      },
      {
        q: "A taste-protection habit is:",
        a: ["Good oral hygiene", "Vaping more", "Sniffing unknown chemicals", "Listening at max volume"],
        correct: 0
      }
    ]
  }
};
