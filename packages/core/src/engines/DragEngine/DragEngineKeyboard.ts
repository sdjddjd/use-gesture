import { DragEngine } from './DragEngineCore'
import { V } from '../../utils/maths'

const DISPLACEMENT = 10

const KEYS_DELTA_MAP = {
  ArrowRight: (factor = 1) => [DISPLACEMENT * factor, 0],
  ArrowLeft: (factor = 1) => [-DISPLACEMENT * factor, 0],
  ArrowUp: (factor = 1) => [0, -DISPLACEMENT * factor],
  ArrowDown: (factor = 1) => [0, DISPLACEMENT * factor]
}

DragEngine.prototype.keyDown = function (event) {
  // @ts-ignore
  const deltaFn = KEYS_DELTA_MAP[event.key]
  const state = this.state
  if (deltaFn) {
    const factor = event.shiftKey ? 10 : event.altKey ? 0.1 : 1
    state._delta = deltaFn(factor)

    this.start(event)
    state._keyboardActive = true

    V.addTo(state._movement, state._delta)

    this.compute(event)
    this.emit()
  }
} as DragEngine['keyDown']

DragEngine.prototype.keyUp = function (event) {
  if (!(event.key in KEYS_DELTA_MAP)) return

  this.setActive({ keyboard: false })
  this.compute(event)
  this.emit()
} as DragEngine['keyUp']
