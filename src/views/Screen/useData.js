import { onMounted, onUnmounted, ref } from 'vue'
import { getEqpData, getData } from '../../api'

let task = null

export function useData() {
  const ready = ref(false)
  const datas = ref({})
  const eqpData = ref({})
  const newData = ref({})

  onMounted(async () => {
    datas.value = await getData()
    eqpData.value = await getEqpData()
    ready.value = true
    task = setInterval(async () => {
      datas.value = await getData()
      newData.value = await getEqpData()
      let key = Object.keys(newData.value)[0]
      if(newData.value[key] !== eqpData.value[key]) {
        eqpData.value = newData.value
        console.log("json==", newData.value);
        localStorage.setItem(newData.value[key], JSON.stringify(newData.value))
      }
    }, 5000)
  })

  onUnmounted(() => {
    if (task) {
      clearInterval(task)
    }
  })

  return {
    ready,
    eqpData,
    datas
  }
}
