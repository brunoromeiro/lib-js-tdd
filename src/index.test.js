import OnLeaveIntent from './index'

describe('OnLeaveIntent', () => {
  let callback
  let onLeave
  const delay = 1000
  jest.useFakeTimers()

  beforeEach(() => {
    callback = jest.fn()
    onLeave = new OnLeaveIntent(callback, delay)
  })

  it('should run the callback function if the user goes out of the screen', () => {
    //advance 1s
    jest.advanceTimersByTime(delay)

    //simulate the user leaving te page
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null
    }))
    expect(callback).toHaveBeenCalled()
  })

  it('should run the callback function if the user stills on the screen', () => {
    //advance 1s
    jest.advanceTimersByTime(delay)

    //simulate the user leaving te page
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: new EventTarget()
    }))
    expect(callback).not.toHaveBeenCalled()
  })

  //até aqui nos ajudou o senhor

  it('should not run the callback function before the delay', () => {
    //advance only .5s
    jest.advanceTimersByTime(delay / 2)

    //simulate the user leaving te page
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null
    }))
    expect(callback).not.toHaveBeenCalled()
  })

  it('should run the callback function only once', () => {
    //advance 1s
    jest.advanceTimersByTime(delay)

    //simulate the user leaving te page
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null
    }))
    document.dispatchEvent(new MouseEvent('mouseout', {
      relatedTarget: null
    }))
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
