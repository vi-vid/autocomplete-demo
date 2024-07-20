<template>
  <header :class="$style.header">
    <picture>
      <source srcset="/logo.png" type="image/png" />
      <img
        :class="[$style.logo]"
        alt="Mátyás Vidosa logo"
        width="554"
        height="227"
        src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
      />
    </picture>
    autocomplete
  </header>
</template>

<style lang="scss" module>
.header {
  top: 0;
  left: 0;
  right: 0;
  padding: 16px;
  font-size: 16px;
  font-size: 20px;
  position: sticky;
  font-weight: 100;
  text-align: center;
  color: $color-black;
  background: $color-white;
  border: 1px solid $color-black;
}

.logo {
  width: 128px;
  height: auto;
  margin: auto;
  display: block;
  margin-bottom: 4px;
}
</style>
