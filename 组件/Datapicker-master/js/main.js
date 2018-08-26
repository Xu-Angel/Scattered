/**
 * Created by anthony on 2017/8/2.
 */
(function () {
    var datapicker=window.datapicker;
    var monthData,$wrapper;
    datapicker.buildUi=function (year,month) {
        monthData=datapicker.getMonthData(year,month);
        var html='<div class="ui-datapicker-header">'+
            '<a href="#" class="ui-datapicker-btn ui-datapicker-btn-prev">&lt;</a>'+
            '<span class="ui-datapicker-curr-month">'
            +monthData.year+'-'+monthData.month+
            '</span>'+
            '<a href="#" class="ui-datapicker-btn ui-datapicker-btn-next">&gt;</a>'+
            '</div>'+
            '<div class="ui-datapicker-body">'+
            '<table>'+
            '<thead>'+
            '<tr>'+
            '<th>日</th>'+
            '<th>一</th>'+
            '<th>二</th>'+
            '<th>三</th>'+
            '<th>四</th>'+
            '<th>五</th>'+
            '<th>六</th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>';
        for(var i=0;i<monthData.days.length;i++){
            var date=monthData.days[i];
            if(i%7==0){
             html+='<tr>';
            }
            html+='<td data-date="' + date.date + '">'+date.showDate+'</td>';
            if(i%7==6){
                html+='</tr>'
            }
        }
        html+='</tbody>'+
        '</table>'+
    '</div>';
    return html;
    };
    datapicker.render=function (direction) {
        var year,month;
        if(monthData){
            year=monthData.year;
            month=monthData.month;
        }
        if(direction==='prev') month--;
        if(direction==='next') month++;
        var innHtml=datapicker.buildUi(year,month);
        $wrapper=document.querySelector('.ui-datapicker-wrapper');

        if(!$wrapper){
            $wrapper=document.createElement('div');
            document.body.appendChild($wrapper);
            $wrapper.className="ui-datapicker-wrapper ui-datapicker-wrapper-show";
        }
        $wrapper.innerHTML=innHtml;
    };
    datapicker.init=function (input) {
        datapicker.render();
        var $input=document.querySelector(input);
        var isOpen=true;
        
        $input.addEventListener('click',function () {
            if(isOpen){
                //显示日历
                $wrapper.classList.remove('ui-datapicker-wrapper-show');
                //获取输入框位置
                var left=$input.offsetLeft;
                var top=$input.offsetTop;
                var height=$input.offsetHeight;
                //写入日历本的位置
                $wrapper.style.top=top+height+2+'px';
                $wrapper.style.left=left+'px';
                isOpen=false;
            }else{
               // 隐藏日历
               $wrapper.classList.add('ui-datapicker-wrapper-show');
               isOpen=true;
            }
        },false);
        //切换月份
        $wrapper.addEventListener('click',function (e) {
            var $target=e.target;
            if(!$target.classList.contains('ui-datapicker-btn')) return false;
        //    上一月
            if($target.classList.contains('ui-datapicker-btn-prev')) {
                datapicker.render('prev');
            }else if($target.classList.contains('ui-datapicker-btn-next')){
                datapicker.render('next');
            }

        },false);
        //点击事件
        $wrapper.addEventListener('click',function (e) {
            var $target=e.target;
            if($target.tagName.toLowerCase() !=='td') return false;

            var date=new Date(monthData.year,monthData.month,$target.dataset.date);
            $input.value=format(date);
            //隐藏日历
            $wrapper.classList.add('ui-datapicker-wrapper-show');
            isOpen=true;
        },false);
    };
    function format(date) {
       var ret='';
        var padding=function (num) {
            if (num<=9){
                return '0'+num;
            }
            return num;
        };
        ret+=date.getFullYear()+'-';
        ret+=padding(date.getMonth()+1)+'-';
        ret+=padding(date.getDate());
        return ret;
    }
})();