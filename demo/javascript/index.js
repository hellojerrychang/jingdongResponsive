$(function() {
	var num = 0,
		$list = $('.container .product-list');
	$('header .menu').click(function() {
		$('header .nav').toggleClass('hide')
	})
	loadData($list, num);
	$('.back-top').click(function() {
		$(window).scrollTop(0)
	})
	$(window).on('scroll', function() {
		if($(window).scrollTop() > 300) {
			$('header').addClass('hide');
			$('.back-top').removeClass('hide');
		} else {
			$('header').removeClass('hide');
			$('.back-top').addClass('hide');
		}

		if($(window).scrollTop() >= $(document).height() - $(window).height()) {
			if(++num < 9) {
				loadData($list, num)
			} else {
				console.log('无数据')
			}
		}
	})

	function loadData($ele, num) {
		$('.loading').removeClass('hide');
		$.ajax({
			url: 'json_data/data-' + num + '.json',
			success: function(data) {
				//console.log(data)
				var str = '';
				$.each(data, function(i, item) {
					str += [
							'<li class="col-xs-6">',
							'<a href=' + item.URL + '>',
							'<div class="img-content">',
							'<img src="images/' + item.imageUrl + '" alt="京东" />',
							'</div>',
							'<div class="text-content pl5">',
							'<p>' + item.productText + '</p>',
							'</div>',
							'<div class="price-content pl5">',
							'<small>￥</small><strong>' + item.productPrice + '</strong>',
							'</div>',
							'<div class="comment-content pl5">',
							'<small>' + item.productEvaluate + '</small><strong>条评论</strong>',
							'</div>',
							'</a>',
							'</li>'
						].join('')
						

				})
				$list.append(str)
				$('.loading').addClass('hide');
			},
			error: function() {
				alert('出错了！！')
			}
		})
	}
})