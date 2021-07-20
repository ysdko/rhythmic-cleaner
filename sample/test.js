<!-- HTML -->
<button id=”small-btn”>小</button>
<button id=”middle-btn”>中</button>
<button id=”big-btn”>大</button>
<p class=”textbox”>本文</p>
<script>
$(function() {
$("#small-btn").click(function() {
$(".textbox").css("font-size", "12px");
});
$("#middle-btn").click(function() {
$(".textbox").css("font-size", "24px");
});
$("#big-btn").click(function() {
$(".textbox").css("font-size", "50px");
});
});
</script>