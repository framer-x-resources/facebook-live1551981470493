import { Data, animate, Override, Animatable } from 'framer'
import { sleep } from './utils'

const data = Data({
  heartBottom: [
    Animatable(84),
    Animatable(84),
    Animatable(84),
    Animatable(84),
    Animatable(84),
  ],
  heartOpacity: [
    Animatable(0),
    Animatable(0),
    Animatable(0),
    Animatable(0),
    Animatable(0),
  ],
  heartScale: [
    Animatable(0),
    Animatable(0),
    Animatable(0),
    Animatable(0),
    Animatable(0),
  ],
  heartRotation: [
    Animatable(0),
    Animatable(0),
    Animatable(0),
    Animatable(0),
    Animatable(0),
  ],
  heartLeft: [
    Animatable(320),
    Animatable(320),
    Animatable(320),
    Animatable(320),
    Animatable(320),
  ],
  heartButtonScale: Animatable(1),
  profileOpacity: Animatable(0.1),
  profileScale: Animatable(1),
  profileBottom: Animatable(0),
  profileLeft: Animatable(296),
  profileEmojiScale: Animatable(0),
  profileEmojiVisible: Animatable(1),
  profileBarsScale: Animatable(0),
  profileBarsVisible: true,
  profileBarsMaskScale: Animatable(0),
  profileBarsMaskVisible: true,
  profilePicScale: Animatable(1),
  profilePicVisible: true,

  overlayOpacity: Animatable(0),
  overlayVisible: false,
  overlayInfoBottom: Animatable(-137),

  graphScale: Animatable(0.2),
})
export const Main: Override = props => {
  animateHearts()
}

export const Heart: Override = props => {
  let currentIndex = props.children[0].props.children[0].props.currentIndex
  return {
    bottom: data.heartBottom[currentIndex],
    opacity: data.heartOpacity[currentIndex],
    scale: data.heartScale[currentIndex],
    rotation: data.heartRotation[currentIndex],
    left: data.heartLeft[currentIndex],
  }
}

export const Profile: Override = props => {
  return {
    bottom: data.profileBottom,
    left: data.profileLeft,
    opacity: data.profileOpacity,
    scale: data.profileScale,
  }
}
export const ProfilePic: Override = props => {
  return {
    scale: data.profilePicScale,
    visible: data.profilePicVisible,
  }
}

export const ProfileEmoji: Override = props => {
  return {
    scale: data.profileEmojiScale,
    visible: data.profileEmojiVisible,
  }
}
export const Bars: Override = props => {
  return {
    visible: data.profileBarsVisible,
    scale: data.profileBarsScale,
  }
}

export const BarMask: Override = props => {
  return {
    scale: data.profileBarsMaskScale,
    visible: data.profileBarsMaskVisible,
  }
}

export const Emoji: Override = props => {
  return {
    async onTap() {
      animate.ease(data.profileBottom, 200)
      animate.ease(data.profileOpacity, 1)
      await sleep(1)
      animate.easeInOut(data.profileScale, 1.4, {
        duration: 0.2,
      })
      animate.easeInOut(data.profileBarsScale, 1, {
        duration: 0.2,
      })
      await sleep(0.1)
      animate.easeInOut(data.profileBarsMaskScale, 1, {
        duration: 0.3,
      })

      await sleep(1)

      animate.easeInOut(data.profilePicScale, 0, {
        duration: 0.3,
      })
      animate.easeInOut(data.profileEmojiScale, 1.1, {
        duration: 0.3,
      })
      await sleep(1)
      data.profileBarsMaskVisible = false
      data.profileBarsVisible = false

      animate.ease(data.profileBottom, 500, {
        duration: 5,
      })
      animate.ease(data.profileLeft, 280, {
        duration: 10,
      })
      animate.easeInOut(data.profileScale, 0.6, {
        duration: 6,
      })
      await sleep(2)
      animate.ease(data.profileOpacity, 0, {
        duration: 0.6,
      })
    },
  }
}

export const Video: Override = props => {
  return {
    async onTap() {
      data.overlayVisible = true
      animate.ease(data.overlayOpacity, 1, {
        duration: 0.3,
      })
      await sleep(0.1)
      animate.ease(data.overlayInfoBottom, 0, {
        duration: 0.3,
      })
      await sleep(0.3)
      animate.ease(data.graphScale, 1, {
        duration: 0.9,
      })
    },
  }
}
export const Overlay: Override = props => {
  return {
    visible: data.overlayVisible,
    opacity: data.overlayOpacity,
  }
}

export const OverlayInfo: Override = props => {
  return {
    bottom: data.overlayInfoBottom,
  }
}
export const OverlayBack: Override = props => {
  return {
    async onTap() {
      animate.ease(data.overlayInfoBottom, -137, {
        duration: 0.1,
      })
      await sleep(0.1)
      animate.ease(data.overlayOpacity, 0, {
        duration: 0.1,
      })
      await sleep(0.1)
      data.graphScale.set(0.2)
      data.overlayVisible = false
    },
  }
}
export const Graph: Override = props => {
  return {
    scaleY: data.graphScale,
    originY: 1,
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function goLeft(i, interval) {
  let leftPosition = getRandomInt(300, 320)
  let firstRotation = getRandomInt(-6, 0)
  animate.easeInOut(data.heartLeft[i], leftPosition, { duration: interval })
  animate.easeInOut(data.heartRotation[i], firstRotation, { duration: 1 })
}

function goRight(i, interval) {
  let rightPosition = getRandomInt(320, 340)
  let secondRotation = getRandomInt(0, 6)
  animate.easeInOut(data.heartLeft[i], rightPosition, { duration: interval })
  animate.easeInOut(data.heartRotation[i], secondRotation, { duration: 1 })
}

function animateHearts() {
  let hearts = [1, 2, 3, 4, 5]

  hearts.forEach((heart, i) => {
    // Start at slightly different times
    setTimeout(() => {
      // Animate heart
      animate.easeOut(data.heartOpacity[i], 0.8, { duration: 0.2 })
      animate.easeOut(data.heartScale[i], 1, { duration: 0.2 })
      animate.easeOut(data.heartBottom[i], 266, { duration: 3 })
      setTimeout(() => {
        animate.easeOut(data.heartOpacity[i], 0, { duration: 1 })
      }, 2000)

      // Set inital direction of animation
      let randomNumber = getRandomInt(0, 2)

      // Start by going left first
      if (randomNumber == 0) {
        goLeft(i, 1)
        setTimeout(() => {
          goRight(i, 1)
        }, 1000)
        setTimeout(() => {
          goLeft(i, 1)
        }, 2000)
      }
      // Start by going right first
      else {
        goRight(i, 1)
        setTimeout(() => {
          goLeft(i, 1)
        }, 1000)
        setTimeout(() => {
          goRight(i, 1)
        }, 2000)
      }
    }, 400 * i)
  })

  setTimeout(() => {
    // animating = false
  }, 5000)
}
