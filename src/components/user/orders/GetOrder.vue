<script>
export default {
  name: 'GetOrder',
  data() {
    return {
      orderNum: '',
    };
  },
  mounted() {
    // 从路由参数中获取订单号
    const orderNum = this.$route.query.orderNum;
    console.log('接收到的订单号:', orderNum);
    this.orderNum = orderNum || '未获取到订单号';
  },
  methods: {
    // 继续点餐：返回首页或点餐页面
    goToOrder() {
      this.$router.push('/'); // 假设首页是点餐页面，请根据实际路由调整
    }
  }
};
</script>

<template>
  <div class="settings-container">
    <div class="settings-card">
      <h1 class="settings-title">下单成功！</h1>

      <!-- 订单号展示区域 -->
      <div class="order-info">
        <div class="info-item">
          <span class="info-label">您的订单号：</span>
          <span class="span-orderNum">{{ orderNum }}</span>
        </div>
        <p class="information">请保存好订单号，取餐时需要出示。</p>
        <p class="information">您也可以在支付宝账单中查看该订单号。</p>
      </div>

      <!-- 操作按钮 -->
      <div class="button-group">
        <el-button
            type="primary"
            @click="goToOrder"
            class="btn-change-password"
        >
          继续点餐
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 完全复用你提供的样式，只做少量调整 */
.settings-container {
  width: 100%;
  min-height: 85vh;
  padding: 20px;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.settings-card {
  width: 100%;
  max-width: 500px;
  padding: 36px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.settings-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.settings-title {
  margin: 0 0 30px;
  color: #1d2129;
  font-size: 28px; /* 稍微调大突出标题 */
  font-weight: 600;
  text-align: center;
}

/* 订单信息区域 */
.order-info {
  margin-bottom: 30px;
  text-align: center;
}

.info-item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.info-label {
  font-size: 18px;
  color: #4e5969;
  white-space: nowrap;
}

/* 你已定义的订单号样式，直接复用 */
.span-orderNum {
  color: #000000;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 2px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 2px none #333333;
  display: inline-block;
  transition: all 0.3s ease;
}

.span-orderNum:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #e0e0e0 0%, #f8f8f8 100%);
}

.information {
  margin-top: 10px;
  color: #86909c;
  font-size: 14px;
}

/* 按钮组样式 */
.button-group {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-change-password {
  flex: 0 1 auto; /* 不强制占满，居中 */
  height: 44px;
  font-size: 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  background-color: #101153;
  border-color: #101153;
  color: white;
  padding: 0 30px;
}

.btn-change-password:hover {
  background-color: #1a1c7a;
  border-color: #1a1c7a;
  transform: translateY(-2px);
  cursor: pointer;
}

/* 响应式 */
@media (max-width: 576px) {
  .settings-card {
    padding: 24px;
  }
  .settings-title {
    font-size: 24px;
  }
  .span-orderNum {
    font-size: 28px;
  }
  .info-label {
    font-size: 16px;
  }
}
</style>