
	var wsodModule = [];

	wsodModule.push('<div id="wsod-home"><span class="tradeTimea">At 9:03 PM ET</span><h4><a href="http://markets.on.nytimes.com/research/markets/overview/overview.asp">Markets &#187;</a></h4>');
wsodModule.push('<div class="marketContainer" style="width:48px;"><div class="countryLabel">Japan</div><div class="marketLabel"><a href="http://markets.on.nytimes.com/research/markets/usmarkets/snapshot.asp?symbol=576473" class="asia">Nikkei</a></div><div><span class="posLast">15,633.76</span></div><div><span class="posChange">+184.13</span></div><div><span class="posChangePct">+1.19%</span></div></div><div class="marketContainer mMarket" style="width:53px;">&nbsp<div class="marketLabel"><a href="http://markets.on.nytimes.com/research/markets/usmarkets/snapshot.asp?symbol=568838" class="asia">HangSeng</a></div><div><span class="posLast">23,985.39</span></div><div><span class="posChange">+179.04</span></div><div><span class="posChangePct">+0.75%</span></div></div><div class="marketContainer" style="width:47px;"><div class="countryLabel" style="background:white;position:relative;width:52px;margin-left:-5px;">China</div><div class="marketLabel"><a href="http://markets.on.nytimes.com/research/markets/usmarkets/snapshot.asp?symbol=586621" class="asia">Shanghai</a></div><div><span class="posLast">2,212.96</span></div><div><span class="posChange">+11.89</span></div><div><span class="posChangePct">+0.54%</span></div></div><div class="disclaimer">Data delayed at least 15 minutes</div>');
	wsodModule.push('<div class="clearElm"></div></div>');
	
	var destModule = document.getElementById("wsodMarketsChart");
	if (destModule) {
		destModule.innerHTML = wsodModule.join("");
	}