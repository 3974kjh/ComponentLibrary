<script lang="ts">
  import "../app.css"
  import { Toaster } from 'svelte-french-toast';

  // toast 간격 설정
  const toastGutter: number = 10;

  // toast 간격 설정
  const toastReverseOrder : boolean = true;

  const toastPosition : 'top-center' | 'top-left' | 'top-right' | 'top-start' | 'top-end' | 'bottom-center' | 'bottom-left' | 'bottom-right' | 'bottom-start' | 'bottom-end' | undefined = "top-center";
</script>

<Toaster gutter={toastGutter} reverseOrder={toastReverseOrder} position={toastPosition}/>
<div class="h-screen w-screen">
  <slot />
</div>