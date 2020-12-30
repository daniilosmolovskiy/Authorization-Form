<template>
  <div class="about">
    <h1>Спасибо! <br> Вы успешно авторизовались!</h1>
  </div>
</template>
<style scoped>
  .about {
     display: flex;
     flex-direction: column;
     margin: 0 auto;
     margin-top: 50px;
     padding: 20px 10px;
     border-radius: 7px;
     box-shadow: 2px 5px 13px 5px rgba(0,0,0,0.61);
     width: 100%;
     max-width: 400px;
     margin-bottom: 40px;
     background: rgba(89, 196, 112, 0.61);
  }
  h1 {
    text-align: center;
    font-size: 24px;
    line-height: 30px;
  }
  @media (max-width: 768px) {
    .about {
      width: 260px;
    }
  }
</style>
