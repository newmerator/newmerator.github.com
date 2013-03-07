
/* PUT/DELETE Extensions for jQuery
---------------------------------------------------------------------------*/

jQuery.extend({

    // Perform a PUT request on the resource specified. The data argument
    // is sent in the request body (without alteration) and the
    // contentType is sent in the "Content-Type" header. If no contentType
    // is specified, "text/plain" is assumed.
    put: function( url, data, contentType, callback ) {
        if ( jQuery.isFunction(contentType) ) {
            callback = contentType;
            contentType = 'text/plain';
        }

        return jQuery.ajax({
            type: 'PUT',
            url: url,
            data: data,
            contentType: contentType,
            processData: false,
            dataType: 'text',
            success: callback
        });
    },

    // Perform a DELETE request on the resource specified and execute
    // callback when response is received and successful.
    del: function( url, callback ) {
        return jQuery.ajax({
            type: 'DELETE',
            url: url,
            success: callback
        });
    },

    // Import another script from the URL provided and execute callback
    // when complete. This is identical to jQuery.getScript() with the
    // exception that caching is enabled.
    require: function( url, callback ) {
        return jQuery.ajax({
            type: 'GET',
            url: url,
            success: callback,
            dataType: 'script',
            data: null,
            cache: true
        });
    }

});

/* Comment form stuff
---------------------------------------------------------------------------*/

$(document).ready(function() {
    var blank_author = "Your Name <http://yoursite.com>";
    $('input#comment_author').each(function() {
        /* instruction text */
        if ( $(this).val() == '' || $(this).val() == blank_author ) {
            $(this).addClass('blank');
            $(this).val(blank_author);
        }else{
            $(this).removeClass('blank');
        }

        /* remove instructions on focus */
        $(this).focus(function() {
            if ( $(this).val() == '' || $(this).val() == blank_author ) {
                $(this).val('');
            }
            $(this).removeClass('blank');
        });
    });

    $('#leave-comment form').submit(function() {
        if ( $(this).find('textarea').val() == '' ) {
            alert("You didn't actually leave a comment. Try again.");
            $(this).find('textarea').focus();
            return false;
        }

        var value = $(this).find('#comment_author').val();
        if ( value == '' || value == blank_author ) {
            alert('I need a name before accepting your comment.');
            $(this).find('#comment_author').focus();
            return false;
        }
    });
});

// vim: ts=4 sw=4 sts=0 noexpandtab