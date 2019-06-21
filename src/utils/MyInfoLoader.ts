export default class MyInfoLoader {
  static async load () {
    const response = await fetch('/user/info')
    if (response.status === 200) {
      const data = await response.json()
      return data
    }
    return { success: false }
  }
}
