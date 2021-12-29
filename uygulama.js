var veri= JSON.parse(localStorage.getItem("uygulamaVeri"));
veri = veri || {};

var kartlar= {
    1:"#bekleyen",
    2:"#devameden",
    3:"#biten",
};

baslat=function(){
    $.each(veri,function(index,elemanlar){
        elementUret(elemanlar);
    });

    $.each(kartlar,function(index,kart){
        $(kart).droppable({
            drop:function(event,gelenObje){
                var element = gelenObje.helper,
                    elementId= element.attr("id");
                var id= elementId.replace("gorev-",""),
                    elementVerisi=veri[id];
                elementSil(elementVerisi);
                elementVerisi.kartKodu=index;
                elementUret(elementVerisi);
                veri[id]=elementVerisi;
                localStorage.setItem("uygulamaVeri",JSON.stringify(veri));
                $("#sil-div").hide();
            },
        });
    });

    
    $("#sil-div").droppable({
        drop:function(event,gelenObje){
            var element = gelenObje.helper,
            elementId = element.attr("id"),
            id= elementId.replace("gorev-",""),
            elementVerisi=veri[id];
            elementSil(elementVerisi);
            delete veri[id];
            localStorage.setItem("uygulamaVeri",JSON.stringify(veri));
            $("#sil-div").hide();
        },
    });
};

var elementSil=function(eleman){
    $("#gorev-"+eleman.id).remove();
};

temizle = function(){
    veri={};
    localStorage.setItem("uygulamaVeri",JSON.stringify(veri));
    $(".uygulama-gorev").remove();
}


var elementUret = function(eleman){
    var parent=$(kartlar[eleman.kartKodu]),gorevDiv;

    gorevDiv=$("<div />",{
        class:"uygulama-gorev",
        id: "gorev-"+eleman.id
    }).appendTo(parent);

    $("<div />",{
        class:"gorev-baslik",
        text: eleman.baslik
    }).appendTo(gorevDiv);

    $("<div />",{
        class:"gorev-tarih",
        text: eleman.tarih
    }).appendTo(gorevDiv);

    $("<div />",{
        class:"gorev-aciklama",
        text: eleman.aciklama
    }).appendTo(gorevDiv);

    gorevDiv.draggable({
        start:function(){
            $("#sil-div").show();
        },
        stop:function(){
            $("#sil-div").hide();
        },
        revert:"invalid",
        revertDuration:200,
    });


};

ekle=function(){
    var inputs= $("#gorev-form :input"),
    id,
    baslik,
    aciklama,
    tarih,
    geciciVeri;

    baslik = inputs[0].value;
    aciklama=inputs[1].value;
    tarih=inputs[2].value;
    
    if(!baslik){
        alert("Başlık boş geçilemez");
        return;
    }

    id= new Date().getTime();

    geciciVeri = {
        id:id,
        kartKodu:"1",
        baslik:baslik,
        tarih:tarih,
        aciklama:aciklama
    }

    veri[id]=geciciVeri;
    localStorage.setItem("UygulamaVeri",JSON.stringify(veri))

    inputs[0].value="";
    inputs[1].value="";
    inputs[2].value="";

elementUret(geciciVeri);
    
};