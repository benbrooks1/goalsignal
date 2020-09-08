<template>
  <div id="bottomContainer">
    <div id="profileContainer">
      <img id="ProfileImage" src="./../../../../Assets/Svg/user.svg" alt="User-Profile-Image" />
      <div>
        <p>Welcome Back, User.</p>
      </div>
    </div>
    <div id="settings">
      <font-awesome-icon @click="$modal.show('Settings');" class="settingsIcon" icon="cog" />

      <span id="notifyWrap"></span>
    </div>
  </div>
</template>
