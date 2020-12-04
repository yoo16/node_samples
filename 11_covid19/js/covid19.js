$(function () {
    let index = 0;
    const totalUrl = 'http://localhost:3000/api/covid19/total';

    $('#form_total').on('submit', function (event) {
        event.preventDefault();

        $.ajax({
            url: totalUrl,
            type: 'post',
            dataType: 'text'
        }).done(function (res) {
            console.debug(res);
            $('#result').text(res);

            const result = JSON.parse(res);
            $('#covid19_pcr').text(result.pcr);
            $('#covid19_death').text(result.death);
        }).fail(function (xhr, status, error) {
            alert(status);
        });
    });
});