export default class DiagnoseListLoader {
  static async load () {
    const response = await fetch('/user/diagnoselist')
    if (response.status === 200) {
      const data = await response.json()
      return data
    }
  }
}
