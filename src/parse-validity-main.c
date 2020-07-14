//
// Created by janevermilion on 13.07.2020.
//
#include "lemin.h"




int   fill_rooms_name_and_coords(char **data, t_main_indexes *indexes, t_parsed_room **rooms_array)
{
    int i;
    int rooms_iter;
    char **splited_line;
    char *trimed;

    rooms_iter = 0;
    i = 1;
    while(i < indexes->paths && data[i])
    {
        if(data[i][0] != '#')
        {

            trimed = ft_strtrim(data[i]);
            splited_line = ft_strsplit(trimed, ' ') ;
            //free trimed!!
            if(ft_arraylen((void **)splited_line) == 3)
            {

                (rooms_array[rooms_iter])->name = ft_strdup(splited_line[0]);
                (rooms_array[rooms_iter])->x = ft_atoi(splited_line[1]);
                (rooms_array[rooms_iter])->y = ft_atoi(splited_line[2]);
                (rooms_array[rooms_iter])->ants = indexes->ants;
                (rooms_array[rooms_iter])->type = 2;

                if(i == indexes->start_room)
                {
                    (rooms_array[rooms_iter])->type = 1;
                }
                else if(i == indexes->end_room)
                {
                    (rooms_array[rooms_iter])->type = 3;
                }
                t_parsed_room *test = rooms_array[rooms_iter];
                rooms_iter++;
            }
            else
                parseError(2,rooms_array,indexes,data);
        }
        i++;
    }
    return i;
}

t_main_indexes *find_indexes_to_parse(char **data, t_main_indexes *indexes)
{
    int quant_ants;

    indexes = find_indexes(data, indexes);
    if(!indexes)
        parseError(1,NULL,indexes,data);
    indexes->rooms = ft_arraylen((void **)data) -1 - indexes->commented_lines - indexes->paths_count;
    if(!indexes->rooms)
        parseError(9,NULL,indexes,data);
    return indexes;
}

void   fill_connections_for_rooms(int i, t_parsed_room **rooms_array, char **data, t_main_indexes *indexes)
{
    int j;
    while (data[i])
    {
        if(data[i][0] != '#')
        {
            char *trimed = ft_strtrim(data[i]);
            char **splited_line = ft_strsplit(trimed, '-');
            if(trimed && splited_line && splited_line[0])
            {
                int ind;
                j = indexes->paths;
                if((ind = this_room_is_appeared(splited_line[0], rooms_array)) != -1 && ind != -5)
                {
                    if(ft_arraylen((void **)splited_line) == 2)
                    {
                        int needed_size = 0;

                        while (data[j])
                        {
                            char *trimed2 = ft_strtrim(data[j]);
                            char **splited_line2 = ft_strsplit(trimed2, '-');
                            //free trimed!!
                            if(trimed2 && splited_line2[0] && splited_line2[1])
                            {
                                if(ft_strcmp(splited_line2[1], splited_line[0]) == 0)
                                    needed_size++;
                                else if(ft_strcmp(splited_line2[0], splited_line[0]) == 0)
                                    needed_size++;
                            }
                            j++;

                        }
                        if(needed_size)
                            create_connections_for_this_room(rooms_array[ind], indexes->paths, data, needed_size);

                    }
                }
                else if(ind == -1)
                    parseError(4, rooms_array,indexes, data);

            }
        }
        //free trimed!!
        i++;
    }
}

t_parsed_room   **check_validity_of_input_data(char **data)
{
    int i;
    t_parsed_room  **rooms_array;
    t_main_indexes *indexes;

    indexes = find_indexes_to_parse(data,indexes);

    if(!(rooms_array = memory_allocate_for_rooms_array(rooms_array, indexes->rooms)))
        parseError(1, NULL,indexes,data);
    i = fill_rooms_name_and_coords(data, indexes, rooms_array);
    fill_connections_for_rooms(i,rooms_array,data,indexes);
    check_connections_for_rooms(rooms_array, data, indexes);
    if(if_all_coordinates_is_zero(rooms_array) == 1)
        parseError(3, rooms_array, indexes, data);
    print_rooms_array(rooms_array);

    return rooms_array;
}