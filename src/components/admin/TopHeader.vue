<script>
    export default {
        name: 'TopHeader',
        data() {
            return {
                isMenuOpen: false,
                activePath: ''
            }
        },
        methods: {
            toggleMenu() {
                this.isMenuOpen = !this.isMenuOpen;
            },
            // 关闭移动菜单（点击导航项后）
            closeMenu() {
                if (window.innerWidth <= 768) {
                    this.isMenuOpen = false;
                }
            },
            handleLogout() {
                this.$confirm('确定要退出登录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message.success('退出登录成功！');
                    localStorage.removeItem('token');
                    localStorage.removeItem("userRole");
                    this.$router.push('/login');
                }).catch(() => {
                    this.$message.info('已取消退出');
                });
            }
        },
        watch: {
            // 监听路由变化，更新激活状态
            $route(to) {
                this.activePath = to.path;
            }
        },
        mounted() {
            // 初始化激活状态
            this.activePath = this.$route.path;

            // 监听窗口大小变化，自动关闭移动菜单
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.isMenuOpen = false;
                }
            });
        },
        beforeDestroy() {
            window.removeEventListener('resize', () => {});
        }
    }
</script>

<template>
    <div>
        <div class="father">
            <img src="../../assets/image/coffee.svg" alt="系统logo">
            <span id="subject">点一点Admin</span>
            <div id="search">
                <input type="text" placeholder="  请输入商品名称……">
            </div>

            <!-- 汉堡菜单按钮 - 仅在小屏幕显示 -->
            <button class="menu-toggle" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <!-- 导航菜单 -->
            <div class="son" :class="{ active: isMenuOpen }">
                <a
                    class="nav-btn"
                    :class="{ 'nav-btn--active': activePath === '/admin/product' }"
                    href="#/admin/product"
                    @click="closeMenu"
                >
                    商品管理
                </a>
                <a
                    class="nav-btn"
                    :class="{ 'nav-btn--active': activePath === '/admin/category' }"
                    href="#/admin/category"
                    @click="closeMenu"
                >
                    分类管理
                </a>
                <a
                    class="nav-btn"
                    :class="{ 'nav-btn--active': activePath === '/admin/orders' }"
                    href="#/admin/orders"
                    @click="closeMenu"
                >
                    订单管理
                </a>
                <a
                    class="nav-btn"
                    style="cursor: pointer"
                    @click="handleLogout"
                >
                    退出登录
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.father {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 100%;
    background-color: #bd74e3;
    margin: 0;
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
}

/* 子元素样式 */
.son {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    height: 100px;
    margin: 0 20px;
}

/* 导航按钮样式 */
.nav-btn {
    display: inline-block;
    padding: 0 20px;
    height: 38px;
    line-height: 38px;
    background-color: #e9d5ff;
    color: #581c87;
    border-radius: 20px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    white-space: nowrap; /* 防止文字换行 */
}

.nav-btn:hover {
    background-color: #d8b4fe;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(167, 139, 250, 0.15);
}

.nav-btn:active {
    transform: translateY(0);
    background-color: #c4a3f5;
    box-shadow: 0 2px 6px rgba(167, 139, 250, 0.1);
}

.nav-btn--active {
    background-color: #9333ea;
    color: #fff;
    box-shadow: 0 2px 8px rgba(147, 51, 234, 0.2);
}

/* 图片样式 */
img {
    width: 100px;
    height: 100px;
    flex-shrink: 0; /* 防止图片缩小 */
}

/* 搜索框样式 */
#search {
    width: 500px;
    display: flex;
    align-items: center;
    margin: 0 20px;
    flex-shrink: 1; /* 允许搜索框收缩 */
}

input {
    height: 30px;
    width: 100%;
    background-color: ghostwhite;
    border-radius: 10px;
    border-style: none;
    padding: 0 10px;
    min-width: 150px; /* 最小宽度，防止过度收缩 */
}

/* 标题样式 */
#subject {
    font-family: 'SubjectFont', sans-serif;
    margin: 0 20px;
    font-size: 30px;
    color: white;
    white-space: nowrap;
    flex-shrink: 0; /* 防止标题缩小 */
}

/* 汉堡菜单按钮 */
.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 25px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
}

.menu-toggle span {
    width: 100%;
    height: 3px;
    background-color: white;
    border-radius: 5px;
    transition: all 0.3s linear;
}

/* 媒体查询 - 适配不同屏幕尺寸 */
/* 大屏幕 */
@media (max-width: 1200px) {
    #search {
        width: 400px;
    }

    .son {
        width: 550px;
    }

    .nav-btn {
        padding: 0 15px;
        font-size: 13px;
    }
}

/* 中等屏幕 */
@media (max-width: 992px) {
    .father {
        flex-wrap: wrap;
        height: auto;
        padding: 10px 20px;
    }

    #search {
        order: 3;
        width: 100%;
        margin: 10px 0;
        justify-content: center;
    }

    input {
        width: 80%;
        max-width: 400px;
    }

    .son {
        width: 100%;
        order: 4;
        margin: 10px 0;
        justify-content: space-around;
        height: auto;
    }

    .nav-btn {
        padding: 0 12px;
        font-size: 12px;
        margin: 5px;
    }

    #subject {
        font-size: 24px;
    }
}

/* 平板屏幕 */
@media (max-width: 768px) {
    .menu-toggle {
        display: flex;
    }

    .son {
        display: none;
        flex-direction: column;
        width: 100%;
        height: auto;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #bd74e3;
        padding: 15px 0;
        z-index: 100;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        margin: 0;
    }

    .son.active {
        display: flex;
    }

    .nav-btn {
        width: 90%;
        text-align: center;
        margin: 5px 0;
        padding: 10px;
    }

    #subject {
        font-size: 20px;
        margin: 0 10px;
    }

    img {
        width: 80px;
        height: 80px;
    }

    #search {
        margin: 10px 0;
    }
}

/* 手机屏幕 */
@media (max-width: 576px) {
    .father {
        padding: 10px 15px;
    }

    #subject {
        font-size: 18px;
        margin: 0 8px;
    }

    img {
        width: 60px;
        height: 60px;
    }

    #search {
        width: 100%;
    }

    input {
        width: 100%;
    }
}

/* 小屏手机 */
@media (max-width: 360px) {
    #subject {
        font-size: 16px;
    }

    .nav-btn {
        font-size: 12px;
        padding: 8px;
    }
}
</style>