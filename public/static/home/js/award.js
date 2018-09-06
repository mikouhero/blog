/*!
 * 仿百度打赏的博客打赏组件
 * Date: 2016-09-10 11:00
 * http://zhangge.net/5110.html
 * (c) 2013-2016 张戈博客保留所有权利.
 *
 * 给博客添加模仿百度打赏的打赏组件
 * 张戈博客基于百度打赏的原创功能，引用或转载请保留版权申明，谢谢合作！
 */
 (function($){
	var id = Date.now();
	function write(){
		var content = "<div class=\"ds-dialog\" id='PAY_"+id+"'>"
		+"   <div class=\"ds-dialog-bg\" onclick=\"PaymentUtils.hide();\"></div>"
		+"   <div class=\"ds-dialog-content ds-dialog-pc \">"
		+"    <i class=\"ds-close-dialog\">&times;</i>"
		+"    <h5>选择打赏方式：</h5>"
		+"    <div class=\"ds-payment-way\">"
		+"     <label for=\"wechat\"><input type=\"radio\" id=\"wechat\" class=\"reward-radio\" value=\"0\" checked=\"checked\" name=\"reward-way\" />微信红包</label>"
		+"     <label for=\"alipay\"><input type=\"radio\" id=\"alipay\" class=\"reward-radio\" value=\"2\" name=\"reward-way\" />支付宝</label>"
		+ "    </div>"

		+ "    <div class=\"ds-payment-img\">"
		+ "     <div class=\"qrcode-img qrCode_0\" id=\"qrCode_0\">"
		+ "      <div class=\"qrcode-border box-size\" style=\"border: 9.02px solid #54B910\">"
		+ "       <img  class=\"qrcode-img qrCode_0\" id=\"qrCode_0\" src=\"../zb_users/theme/talklee/include/zans/weixin.jpg\" />"
		+ "      </div>"
		+ "      <p class=\"qrcode-tip\">打赏</p>"
		+ "     </div>"
		+ "     <div class=\"qrcode-img qrCode_2\" id=\"qrCode_2\">"
		+ "      <div class=\"qrcode-border box-size\" style=\"border: 9.02px solid #4391EA\">"
		+ "       <img  class=\"qrcode-img qrCode_2\" id=\"qrCode_2\" src=\"../zb_users/theme/talklee/include/zans/zfb.jpg\" />"
		+ "      </div>"
		+ "      <p class=\"qrcode-tip\">打赏</p>"
		+ "     </div>"
		+ "    </div>"

		+ "   </div>"
		+ "  </div> ";
		$("body").append(content);
	}
$(function(){
	write();
	var $pay = $("#PAY_"+id).hide();
	$pay.find(".ds-payment-way").bind("click",function(){
                $pay.find(".qrcode-img").hide();
		$pay.find(".qrCode_"+$pay.find("input[name=reward-way]:checked").val()).show();
	  });
	 $pay.find(".ds-close-dialog").bind("click",function(){
		  $pay.hide();
	 });
  });
  var PaymentUtils = window['PaymentUtils']={};
  PaymentUtils.show=function(){
	  $("#PAY_"+id).show();
  }
  PaymentUtils.hide=function(){
	  $("#PAY_"+id).hide();
  }
})(jQuery);