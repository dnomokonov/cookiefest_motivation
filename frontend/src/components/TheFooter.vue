<script setup>
    const today = new Date()
    const year = today.getFullYear()
</script>

<template>
    <footer>
        <div class="content">
            <div class="footer_text">
                <h2>balance</h2>
                <p>Современная система мотивации</p>
                <ul>
                    <li>
                        <a href="">
                            <img src="@assets/icon_telegram.svg" alt="telegram">
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="@assets/icon_vk.svg" alt="vk">
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="@assets/icon_instagram.svg" alt="instagram">
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="@assets/icon_youTube.svg" alt="youTube">
                        </a>
                    </li>
                </ul>
            </div>
            <div class="security">
                <p>Все права защищены правообладателем</p>
                <p>{{ year }}</p>
            </div>
        </div>
    </footer>    
</template>

<style scoped>
    footer {
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;
        background-color: #6E7F91;
        color: #EFECE7;
        padding: 0px 0 110px 0;
    }

    .content {
        width: 100%;
        max-width: 1280px;
        display: flex;
        justify-content: space-between; 
        align-items: center;
        
    }

    .footer_text {
        display: flex;
        flex-direction: column;
        margin-top: 5%;
    }

    .footer_text h2 {
        font-size: 45px;
        text-transform: uppercase;
    }

    .footer_text p{
        padding: 0;
        margin: 5px 0 20px 0;
    }

    .footer_text ul{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 15px;
    }

    .footer_text ul li a img {
        width: 45px;
    }

    .security {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-size: 12px;
        margin-bottom: 10px;
    }

    .security p {
        padding: 2px;
        margin: 0;
    }

</style>