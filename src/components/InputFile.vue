<script>
import axios from "axios";
export default {
  data() {
    return {
      fileName: "Файл не выбран",
      fileStatus: "empty",
      error: "",
    };
  },
  computed: {
    buttonText() {
      switch (this.fileStatus) {
        case "empty":
          return "Выбрать файл";
        case "loading":
          return "Отменить";
        case "loaded":
          return "Удалить";
        default:
          return "Выбрать файл";
      }
    },
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    buttonClickHandler() {
      if (this.fileStatus === "empty") {
        this.openFileInput();
      }
      this.resetFileInput();
    },
    resetFileInput() {
      this.$refs.fileInput.value = ""; // Сбросить значение input
      this.fileName = "Файл не выбран";
      this.fileStatus = "empty";
    },
    async handleFileUpload(event) {
      // Получаем файл
      const file = event.target.files[0];
      // Значение имени файла
      this.fileName = file.name;
      // Статус загрузки
      this.fileStatus = "loading";

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios({
          method: "post",
          url: "https://767088318028edcc.mokky.dev/file",
          data: formData,
        });
        console.log(formData);
        this.fileStatus = "loaded";
      } catch (error) {
        console.error("Error message", error);
        this.error = "Error message";
        this.fileStatus = "empty";
        this.fileName = "Файл не выбран";
      }
    },
  },
};
</script>



<template>
  <div class="font-normal text-base">
    <h2 class="font-medium text-label mb-3">Label</h2>
    <div class="flex items-center cursor-pointer text-sm">
      <input
        class="hidden"
        type="file"
        name="file"
        @change="handleFileUpload"
        ref="fileInput"
      />
      <button
        @click="buttonClickHandler"
        class="inline-block p-3 rounded-xl border border-slate-200 text-center text-btn shadow-bth hover:bth-hover"
      >
        {{ buttonText }}
      </button>
      <div class="flex ml-4 gap-2">
        <img
          v-if="fileStatus === 'loading'"
          class="animate-spin"
          src="../assets/line.svg"
          alt="loading"
        />
        <span
          class="text-fill"
          >{{ fileName }}</span
        >
      </div>
    </div>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    <p v-else class="text-hint mt-2">Hint text</p>
  </div>
</template>
